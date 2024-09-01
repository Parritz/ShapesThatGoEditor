import { Input } from "./input";
import { Renderer } from "./renderer";

window.onload = function() {
	const renderer = new Renderer();
	new Input(renderer.scene);
}