// Tile Ids
// air: 0
// block: 1
// spike: 2
// upside down spikes: 3
// Bounce: 4
// Double Jump: 5
// Shield: 6
// Pog: 7

import { Renderer } from "./renderer";

export abstract class Tiles {
    public static boxWidth: number;
    public static boxHeight: number;
    public static currentTile: HTMLImageElement | undefined | null;
    public static filledBoxes: {tileX: number, tileY: number, tileID: string}[] = [];
    
    static tileClicked(tilePicked: HTMLImageElement) {
        if (tilePicked == Tiles.currentTile) {
            Tiles.currentTile.style.border = "none";
            Tiles.currentTile = null;
            return;
        } else if (Tiles.currentTile) {
            Tiles.currentTile.style.border = "none";
        }

        tilePicked.style.border = "2px solid black";
        Tiles.currentTile = tilePicked;
    }

    static getTileFromId(id: string): HTMLImageElement | HTMLDivElement | undefined {
        for (const child of document.getElementsByClassName("tile") as HTMLCollectionOf<HTMLElement>) {
            if (child.dataset.tileid == id) {
                if (child instanceof HTMLImageElement) {
                    return child;
                } else if (child instanceof HTMLDivElement) {
                    return child;
                }
            }
        }
    }

    static getTilePosition(mouseX: number, mouseY: number) {
        const tileX = Math.floor((mouseX + Renderer.cameraX) / Tiles.boxWidth);
        const tileY = Math.floor(mouseY / Tiles.boxHeight);
        return { tileX, tileY };
    }

    static removeTile(TileX: number, TileY: number) {
        for (let i = 0; i < this.filledBoxes.length; i++) {
            const filledBox = this.filledBoxes[i];
            if (filledBox.tileX == TileX && filledBox.tileY == TileY) {
                this.filledBoxes.splice(i, 1);
                break;
            }
        }
    }

    static removeTileFromMousePos(mouseX: number, mouseY: number) {
        const { tileX, tileY } = this.getTilePosition(mouseX, mouseY);
        this.removeTile(tileX, tileY);
    }

    static isTileOutOfBounds(tileX: number, tileY: number) {
        if (tileX > 35 || tileX < 0) {
            return true;
        }
        if (tileY > 9 || tileY < 0) {
            return true;
        }
    }

    static fillTile(mouseX: number, mouseY: number) {
        const { tileX, tileY } = this.getTilePosition(mouseX, mouseY);
        if (this.isTileOutOfBounds(tileX, tileY) || !this.currentTile) {
            return;
        }

        this.removeTile(tileX, tileY);
        this.filledBoxes.push({
            tileX,
            tileY,
            tileID: this.currentTile?.dataset.tileid!
        });
    }
}