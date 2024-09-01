import { Tiles } from "./tiles";

export class Input {
    public mouseDown = false;

    constructor(scene: CanvasRenderingContext2D) {
        scene.canvas.addEventListener("mousemove", this.onMouseMove, false);
        scene.canvas.addEventListener("mousedown", this.onMouseDown, false);
        scene.canvas.addEventListener("mouseup", () => {
            this.mouseDown = false;
        }, false);
        scene.canvas.addEventListener("mouseout", () => {
            this.mouseDown = false;
        }, false);
    }

    onMouseMove(event: MouseEvent) {
        if (!this.mouseDown) {
            return;
        }
    
        Tiles.fillBox(event.offsetX, event.offsetY);
    }
    
    onMouseDown(event: MouseEvent) {
        this.mouseDown = true;
        Tiles.fillBox(event.offsetX, event.offsetY);
    }
}