import { Input } from "./input.js";
import { Renderer } from "./renderer.js";
import { Tiles } from "./tiles.js";


(window as any).Tiles = Tiles;
window.onload = function() {
	const renderer = new Renderer();
	new Input(renderer.scene);
}