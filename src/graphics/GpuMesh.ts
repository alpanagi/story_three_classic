import { Mesh } from "../engine/Mesh";
import { Vertex } from "../engine/Vertex";

export class GpuMesh {
    public readonly mesh: Mesh;
    public readonly buffer: GPUBuffer;

    public constructor(device: GPUDevice, mesh: Mesh) {
        this.mesh = mesh;
        this.buffer = device.createBuffer({
            usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
            size: mesh.vertices.length * Vertex.getSize(),
        });
        device.queue.writeBuffer(this.buffer, 0, mesh.vertexData());
    }
}
