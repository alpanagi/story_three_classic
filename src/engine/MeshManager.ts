import { Mesh } from "./Mesh";
import { ObjLoader } from "../obj/ObjLoader";

export class MeshManager {
    private meshes: Map<string, Mesh>;

    public constructor() {
        this.meshes = new Map();
    }

    public async getMesh(path: string) {
        if (!this.meshes.has(path)) {
            this.meshes.set(path, await ObjLoader.load(path));
        }

        return this.meshes.get(path)!;
    }
}
