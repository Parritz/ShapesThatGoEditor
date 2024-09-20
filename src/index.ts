import { exportChunk } from "./export";
import { Input } from "./input";
import { playLevel } from './playTest';
import { Renderer } from "./renderer";
import { Tiles } from "./tiles";

declare global {
    interface Window {
        Tiles: typeof Tiles;
        exportLevel: typeof exportChunk;
		playLevel: typeof playLevel;
    }
}

window.Tiles = Tiles;
window.playLevel = playLevel;
window.exportLevel = exportChunk;
window.onload = function() {
	const renderer = new Renderer();
	new Input(renderer.scene);
}