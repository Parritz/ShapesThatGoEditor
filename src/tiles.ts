// Tile Ids
// air: 0
// block: 1
// spike: 2
// upside down spikes: 3
// Bounce: 4
// DJ: 5
// Shield: 6
// Pog: 7

export abstract class Tiles {
    public static boxWidth = 75;
    public static boxHeight = 75;
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

    static getTilePosition(x: number, y: number) {
        const tileX = Math.floor(x / Tiles.boxWidth);
        const tileY = Math.floor(y / Tiles.boxHeight);
        return { tileX, tileY };
    }

    static checkIfTileFilled(x: number, y: number) {
        if (this.currentTile?.dataset.tileid == "0") {
            return false;
        }

        for (const filledBox of Tiles.filledBoxes) {
            if (filledBox.tileX == x && filledBox.tileY == y) {
                return true;
            }
        }
        return false;
    }

    static fillBox(mouseX: number, mouseY: number) {
        const { tileX, tileY } = this.getTilePosition(mouseX, mouseY);
        if (this.checkIfTileFilled(tileX, tileY)) {
            return;
        }

        this.filledBoxes.push({
            tileX,
            tileY,
            tileID: this.currentTile?.dataset.tileid!
        });
    }
}

export abstract class SpikeTile {
    draw() {
        
    }
}