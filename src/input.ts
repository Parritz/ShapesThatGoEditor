import { Tiles } from "./tiles.js";

export class Input {
    public mouseDown = false;

    constructor(scene: CanvasRenderingContext2D) {
        scene.canvas.addEventListener("mousemove", this.onMouseMove.bind(this), false);
        scene.canvas.addEventListener("mousedown", this.onMouseDown.bind(this), false);
        window.addEventListener("mouseup", () => {
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
        switch (event.button) {
            // Left click
            case 0: {
                Tiles.fillBox(event.offsetX, event.offsetY);
                break;
            }

            // Right click
            case 2: {
                console.log("Right click")
                break;
            }
        }
    }
}