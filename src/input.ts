import { Tiles } from "./tiles";

export class Input {
    public mouseDown = false;
    public mouseMode = "LEFT";

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
    
        // Either fill box or clear box depending on if left or right mouse button is pressed
        this.mouseMode == "LEFT" ? Tiles.fillTile(event.offsetX, event.offsetY) : Tiles.removeTileFromMousePos(event.offsetX, event.offsetY);
    }
    
    onMouseDown(event: MouseEvent) {
        this.mouseDown = true;
        switch (event.button) {
            // Left click
            case 0: {
                this.mouseMode = "LEFT";
                Tiles.fillTile(event.offsetX, event.offsetY);
                break;
            }

            // Right click
            case 2: {
                this.mouseMode = "RIGHT";
                Tiles.removeTile(event.offsetX, event.offsetY);
                break;
            }
        }
    }
}