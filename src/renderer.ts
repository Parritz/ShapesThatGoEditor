import { Tiles } from './tiles';

export class Renderer {
    public scene: CanvasRenderingContext2D;
    public sceneElement: HTMLCanvasElement;
    public currentTile: HTMLImageElement | undefined | null;
    public static cameraX: number = 0;

    constructor() {
        this.sceneElement = document.getElementById("scene") as HTMLCanvasElement;
        this.scene = this.sceneElement.getContext("2d") as CanvasRenderingContext2D; // Cast this because it will always be available
        this.resizeCanvas();

        this.scene.canvas.addEventListener("wheel", (event) => {
            this.handleScroll(event);
        });

        requestAnimationFrame(this.update.bind(this));
    }

    handleScroll(event: WheelEvent) {
        event.preventDefault();
        Renderer.cameraX -= event.deltaY > 0 ? 30 : -30;
    }

    resizeCanvas() {
        this.scene.canvas.width = this.sceneElement.clientWidth;
        this.scene.canvas.height = this.sceneElement.clientHeight;
    }

    renderBox(tileX: number, tileY: number, tileID: string) {
        const boxPositionX = Tiles.boxWidth * tileX - Renderer.cameraX;
        const boxPositionY = Tiles.boxHeight * tileY;
        
        const tile = Tiles.getTileFromId(tileID);
        if (tile) {
            const tileId = tile.dataset.tileid;
            switch (tileId) {
                case "0": { // Air
                    Tiles.removeTile(tileX, tileY);
                    break;
                }
                case "1": { // Block
                    this.scene.fillStyle = "blue";
                    this.scene.lineWidth = 1;
                    this.scene.fillRect(boxPositionX, boxPositionY, Tiles.boxWidth, Tiles.boxHeight);
                    this.scene.strokeRect(boxPositionX, boxPositionY, Tiles.boxWidth, Tiles.boxHeight);
                    this.scene.fillStyle = "#000";
                    break;
                }
                case "2": { // Spike
                    this.scene.fillStyle = "yellow";
                    this.scene.beginPath();
                    this.scene.moveTo(boxPositionX, boxPositionY + Tiles.boxHeight);
                    this.scene.lineTo(boxPositionX + Tiles.boxWidth, boxPositionY + Tiles.boxHeight);
                    this.scene.lineTo(boxPositionX + Tiles.boxWidth / 2, boxPositionY);
                    this.scene.fill();
                    break;
                }
                case "3": { // Upside down spike
                    this.scene.fillStyle = "yellow";
                    this.scene.beginPath();
                    this.scene.moveTo(boxPositionX + Tiles.boxWidth / 2, boxPositionY + Tiles.boxHeight + 5);
                    this.scene.lineTo(boxPositionX, boxPositionY);
                    this.scene.lineTo(boxPositionX + Tiles.boxWidth, boxPositionY);
                    this.scene.fill();
                    break;
                }
                default: {
                    if (tile instanceof HTMLImageElement) {
                        const image = new Image();
                        image.src = tile.src;
                        image.sizes = "20px"
                        this.scene.drawImage(image, boxPositionX, boxPositionY, Tiles.boxWidth, Tiles.boxHeight);
                    }
                    break;
                }
            }
        }
    }

    update() {
        this.resizeCanvas();
        this.scene.clearRect(0, 0, this.scene.canvas.width, this.scene.canvas.height);

        // Render all the blocks which have been filled
        for (const filledBox of Tiles.filledBoxes) {
            this.renderBox(filledBox.tileX, filledBox.tileY, filledBox.tileID);
        }

        // Allow zooming out of the grid
        this.scene.setLineDash([5, 5]);

        // Render vertical grid lines
        for (let i = 0; i <= 36; i++) {
            this.scene.beginPath();
            this.scene.moveTo(Tiles.boxWidth * i - Renderer.cameraX, 0);
            this.scene.lineTo(Tiles.boxWidth * i - Renderer.cameraX, this.scene.canvas.height);
            this.scene.stroke();
        }
    
        // Render horizontal grid lines
        for (let i = 0; i <= 10; i++) {
            this.scene.beginPath();
            this.scene.moveTo(0, Tiles.boxHeight * i);
            this.scene.lineTo(this.scene.canvas.width, Tiles.boxHeight*i);
            this.scene.stroke();
        }

        requestAnimationFrame(this.update.bind(this));
    }
}