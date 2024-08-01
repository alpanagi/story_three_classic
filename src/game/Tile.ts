import { TileKind } from "./TileKind";
import { vec4 } from "gl-matrix";

export class Tile {
    public readonly kind: TileKind;
    public readonly position: vec4;

    public constructor(
        kind: TileKind,
        position: vec4,
    ) {
        this.kind = kind;
        this.position = position;
    }
}
