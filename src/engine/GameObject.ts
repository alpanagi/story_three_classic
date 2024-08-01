import { Mesh } from "./Mesh";

export class GameObject {
    public readonly mesh: Mesh;

    public constructor(mesh: Mesh) {
        this.mesh = mesh;
    }
}
