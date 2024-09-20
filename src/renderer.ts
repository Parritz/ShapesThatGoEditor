import { Tiles } from './tiles';

export class Renderer {
    public scene: CanvasRenderingContext2D;
    public sceneElement: HTMLCanvasElement;
    public currentTile: HTMLImageElement | undefined | null;
    public static isTicking: boolean = true;
    public static cameraX: number = 0;

    private gridSizeX = 36;
    private gridSizeY = 10;

    constructor() {
        this.sceneElement = document.getElementById("scene") as HTMLCanvasElement;
        this.scene = this.sceneElement.getContext("2d") as CanvasRenderingContext2D; // Cast this because it will always be available
        this.resizeCanvas();

        requestAnimationFrame(this.update.bind(this));
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
                        this.scene.drawImage(image, boxPositionX, boxPositionY, Tiles.boxWidth, Tiles.boxHeight);
                    }
                    break;
                }
            }
        }
    }

    update() {
        this.resizeCanvas(); // Ensure the canvas is resized
        this.scene.clearRect(0, 0, this.scene.canvas.width, this.scene.canvas.height);
    
        // Dynamically calculate box height and width based on screen and grid size
        Tiles.boxHeight = this.scene.canvas.height / this.gridSizeY;
        Tiles.boxWidth = Tiles.boxHeight;
    
        // Render all the blocks which have been filled
        for (const filledBox of Tiles.filledBoxes) {
            this.renderBox(filledBox.tileX, filledBox.tileY, filledBox.tileID);
        }
    
        this.scene.setLineDash([5, 5]);
    
        // Render vertical grid lines
        for (let i = 0; i <= this.gridSizeX; i++) {
            this.scene.beginPath();
            this.scene.moveTo(Tiles.boxWidth * i - Renderer.cameraX, 0);
            this.scene.lineTo(Tiles.boxWidth * i - Renderer.cameraX, Tiles.boxHeight * this.gridSizeY);
            this.scene.stroke();
        }
    
        // Render horizontal grid lines
        for (let i = 0; i <= this.gridSizeY; i++) {
            this.scene.beginPath();
            this.scene.moveTo(-Renderer.cameraX, Tiles.boxHeight * i);
            this.scene.lineTo(Tiles.boxWidth * this.gridSizeX - Renderer.cameraX, Tiles.boxHeight * i);
            this.scene.stroke();
        }
    
        if (Renderer.isTicking) {
            requestAnimationFrame(this.update.bind(this));
        }
    }
    
}