import { Game } from "../game/Game";
import { GameObject } from "./GameObject";
import { Graphics } from "../graphics/Graphics";
import { MeshManager } from "./MeshManager";

export class Engine {
    private graphics: Graphics;
    private meshManager: MeshManager;
    private gameObjects: GameObject[];
    private game: Game;

    public constructor(
        graphics: Graphics,
    ) {
        this.graphics = graphics;
        this.meshManager = new MeshManager();
        this.game = new Game();
        this.gameObjects = [];
    }

    public static async create() {
        const graphics = await Graphics.create();
        return new Engine(graphics);
    }

    public async run() {
        for (const _ of this.game.tiles) {
            this.gameObjects.push(new GameObject(
                await this.meshManager.getMesh("assets/meshes/triangle.obj"),
            ));
        }
        this.gameObjects.forEach(x => this.graphics.addGameObject(x));
        requestAnimationFrame(() => this.frame());
    }

    public frame() {
        console.log("FRAME");
        this.graphics.render();
        requestAnimationFrame(() => this.frame());
    }
}
