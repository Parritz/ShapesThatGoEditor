import { Input } from "./input.js";
import { Renderer } from "./renderer.js";

window.onload = function() {
	const renderer = new Renderer();
	new Input(renderer.scene);
}