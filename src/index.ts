import { Engine } from "./engine/Engine";

void main();

async function main() {
    const engine = await Engine.create();
    engine.run();
}
