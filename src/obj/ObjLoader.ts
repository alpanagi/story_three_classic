import { Mesh } from "../engine/Mesh";
import { Vertex } from "../engine/Vertex";
import { vec4 } from "gl-matrix";

export class ObjLoader {
    public static async load(filename: string) {
        const response = await fetch(filename);
        const data = await response.text();
        const lines = data.split("\n");

        const positions: vec4[] = [];
        const vertices: Vertex[] = [];

        lines.forEach(line => {
            if (line.startsWith("v ")) {
                const parts = line.split(" ");
                parts.shift();

                positions.push(vec4.fromValues(
                    parseFloat(parts[0]!),
                    parseFloat(parts[1]!),
                    parseFloat(parts[2]!),
                    1,
                ));
            }

            if (line.startsWith("f ")) {
                const parts = line.split(" ");
                parts.shift();

                parts.forEach(part => {
                    const tokens = part.split("/");
                    vertices.push(new Vertex(
                        positions[parseInt(tokens[0]!) - 1]!,
                    ));
                });
            }
        });

        return new Mesh(vertices);
    }
}
