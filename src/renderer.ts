import { Tiles } from "./tiles.js";

export class Renderer {
    public scene: CanvasRenderingContext2D;
    public sceneElement: HTMLCanvasElement;
    public currentTile: HTMLImageElement | undefined | null;

    constructor() {
        this.sceneElement = document.getElementById("scene") as HTMLCanvasElement;
        this.scene = this.sceneElement.getContext("2d") as CanvasRenderingContext2D; // Cast this because it will always be available
        this.resizeCanvas();

        window.addEventListener("resize", () => {
            this.resizeCanvas;
        });

        requestAnimationFrame(this.update.bind(this));
    }

    resizeCanvas() {
        this.scene.canvas.width = this.sceneElement.clientWidth;
        this.scene.canvas.height = this.sceneElement.clientHeight;
    }

    renderBox(boxX: number, boxY: number, tileID: string) {
        const boxPositionX = Tiles.boxWidth * boxX;
        const boxPositionY = Tiles.boxHeight * boxY;

        this.scene.beginPath();
        this.scene.moveTo(boxPositionX, boxPositionY);
        this.scene.lineTo(boxPositionX + Tiles.boxWidth, boxPositionY + Tiles.boxHeight);
        this.scene.stroke();
        
        const tile = Tiles.getTileFromId(tileID);
        if (tile) {
            if (tile instanceof HTMLImageElement) {
                const image = new Image();
                image.src = tile.src;
                image.sizes = "20px"
                this.scene.drawImage(image, boxPositionX, boxPositionY, Tiles.boxWidth, Tiles.boxHeight);
                this.scene.strokeRect(boxPositionX, boxPositionY, Tiles.boxWidth, Tiles.boxHeight);
                this.scene.fillStyle = "#000";
            } else {
                this.scene.fillStyle = "blue";
                this.scene.lineWidth = 1;
                this.scene.fillRect(boxPositionX, boxPositionY, Tiles.boxWidth, Tiles.boxHeight);
                this.scene.strokeRect(boxPositionX, boxPositionY, Tiles.boxWidth, Tiles.boxHeight);
                this.scene.fillStyle = "#000";
            }
        }
    }

    update() {
        // Render vertical grid lines
        for (let i = 0; i < this.scene.canvas.width; i++) {
            this.scene.beginPath();
            this.scene.moveTo(Tiles.boxWidth * i, 0);
            this.scene.lineTo(Tiles.boxWidth * i, this.scene.canvas.height);
            this.scene.stroke();
        }
    
        // Render horizontal grid lines
        for (let i = 0; i < this.scene.canvas.width; i++) {
            this.scene.beginPath();
            this.scene.moveTo(0, Tiles.boxHeight * i);
            this.scene.lineTo(this.scene.canvas.width, Tiles.boxHeight*i);
            this.scene.stroke();
        }
        
        // Render all the blocks which have been filled
        for (const filledBox of Tiles.filledBoxes) {
            this.renderBox(filledBox.tileX, filledBox.tileY, filledBox.tileID);
        }
    
        this.scene.fillStyle = "red";
        this.scene.fillRect(0, 0, 75, 75);
    
        requestAnimationFrame(this.update.bind(this));
    }
}