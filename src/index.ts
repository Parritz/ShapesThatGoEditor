import { exportLevel } from "./export";
import { Input } from "./input";
import { Renderer } from "./renderer";
import { Tiles } from "./tiles";

(window as any).Tiles = Tiles;
(window as any).exportLevel = exportLevel;
window.onload = function() {
	const renderer = new Renderer();
	new Input(renderer.scene);
}