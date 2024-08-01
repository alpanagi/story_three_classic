import { Character } from "./Character";
import { Tile } from "./Tile";
import { TileKind } from "./TileKind";
import { Wall } from "./Wall";
import { vec4 } from "gl-matrix";

export class Game {
    public readonly characters: Character[];
    public readonly tiles: Tile[];
    public readonly walls: Wall[];

    public constructor() {
        this.characters = [];
        this.tiles = [new Tile(TileKind.Stone, vec4.fromValues(0, 0, 0, 1))];
        this.walls = [];
    }
}
