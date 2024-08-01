import { GameObject } from "../engine/GameObject";
import { GpuMeshManager } from "./GpuMeshManager";
import { GpuObject } from "./GpuObject";
import shader from "./shader.wgsl";

export class Graphics {
    private device: GPUDevice;
    private canvasContext: GPUCanvasContext;
    private pipeline: GPURenderPipeline;
    private gpuMeshManager: GpuMeshManager;
    private gpuObjects: GpuObject[];

    private constructor(
        device: GPUDevice,
        canvasContext: GPUCanvasContext,
        pipeline: GPURenderPipeline,
    ) {
        this.device = device;
        this.canvasContext = canvasContext;
        this.pipeline = pipeline;
        this.gpuMeshManager = new GpuMeshManager(device);
        this.gpuObjects = [];
    }

    public static async create() {
        if (!navigator.gpu) {
            throw new Error("WebGPU is unsupported");
        }

        const device = await Graphics.getDevice();
        const canvasContext = Graphics.getCanvasContext(device);
        const pipeline = Graphics.createPipeline(device);

        return new Graphics(
            device,
            canvasContext,
            pipeline,
        );
    }

    public render() {
        const encoder = this.device.createCommandEncoder();
        const renderPass = encoder.beginRenderPass({
            colorAttachments: [{
                loadOp: "clear",
                storeOp: "store",
                view: this.canvasContext
                    .getCurrentTexture()
                    .createView(),
            }],
        });
        renderPass.setPipeline(this.pipeline);

        this.gpuObjects.forEach(gpuObject => {
            const gpuMesh = this.gpuMeshManager.getMesh(gpuObject.meshId);
            if (gpuMesh) {
                renderPass.setVertexBuffer(0, gpuMesh.buffer);
                renderPass.draw(gpuMesh.mesh.vertices.length);
            }
        });

        renderPass.end();
        this.device.queue.submit([encoder.finish()]);
    }

    public addGameObject(gameObject: GameObject) {
        this.gpuMeshManager.addMesh(gameObject.mesh);
        this.gpuObjects.push(new GpuObject(gameObject.mesh.id));
    }

    private static async getDevice() {
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            throw new Error("Couldn't get graphics adapter");
        }
        return await adapter.requestDevice();
    }

    private static getCanvasContext(device: GPUDevice) {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const canvasContext = canvas.getContext("webgpu");
        if (!canvasContext) {
            throw new Error("Couldn't get webgpu canvas context");
        }
        canvasContext.configure({
            device,
            format: "rgba8unorm",
        });
        return canvasContext;
    }

    private static createPipeline(device: GPUDevice) {
        const shaderModule = device.createShaderModule({
            code: shader,
        });

        return device.createRenderPipeline({
            layout: device.createPipelineLayout({
                bindGroupLayouts: [],
            }),
            vertex: {
                module: shaderModule,
                buffers: [{
                    attributes: [{
                        format: "float32x4",
                        offset: 0,
                        shaderLocation: 0,
                    }],
                    arrayStride: 4 * 4,
                }],
            },
            fragment: {
                module: shaderModule,
                targets: [{
                    format: "rgba8unorm",
                }],
            },
        });
    }
}
