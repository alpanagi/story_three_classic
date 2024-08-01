import { GpuMesh } from "./GpuMesh";
import { Mesh } from "../engine/Mesh";

export class GpuMeshManager {
    private device: GPUDevice;
    private gpuMeshes: Map<string, GpuMesh>;

    public constructor(device: GPUDevice) {
        this.device = device;
        this.gpuMeshes = new Map();
    }

    public addMesh(mesh: Mesh) {
        if (this.gpuMeshes.has(mesh.id)) {
            return;
        }

        this.gpuMeshes.set(mesh.id, new GpuMesh(this.device, mesh));
    }

    public getMesh(id: string) {
        return this.gpuMeshes.get(id);
    }
}
