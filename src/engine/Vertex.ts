import { vec4 } from "gl-matrix";

export class Vertex {
    public readonly position: vec4;

    public constructor(
        position: vec4,
    ) {
        this.position = position;
    }

    public static getSize() {
        return 4 * 4;
    }
}
