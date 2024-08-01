import { WallKind } from "./WallKind";
import { vec4 } from "gl-matrix";

export class Wall {
    public readonly kind: WallKind;
    public readonly position: vec4;

    public constructor(
        kind: WallKind,
        position: vec4,
    ) {
        this.kind = kind;
        this.position = position;
    }
}
