import { Vertex } from "./Vertex";
import { v4 as uuid } from "uuid";

export class Mesh {
    public readonly id: string;
    public readonly vertices: Vertex[];

    public constructor(
        vertices: Vertex[],
    ) {
        this.id = uuid();
        this.vertices = vertices;
    }

    public vertexData() {
        return new Float32Array(
            this.vertices.map(x => [...x.position]).flat(),
        );
    }
}
