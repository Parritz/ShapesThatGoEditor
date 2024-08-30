const tilePickerElement = document.getElementById("tilePicker") as HTMLUListElement;
const sceneElement = document.getElementById("scene") as HTMLCanvasElement;
const scene = sceneElement.getContext("2d") as CanvasRenderingContext2D; // Cast this because it will always be available

const boxWidth = 75;
const boxHeight = 75;
let mouseDown = false;

// Block Ids
// air: 0
// block: 1
// spike: 2
// upside down spikes: 3
// Bounce: 4
// DJ: 5
// Shield: 6
// Pog: 7

scene.canvas.addEventListener("mousemove", onMouseMove, false);
scene.canvas.addEventListener("mousedown", onMouseDown, false);
scene.canvas.addEventListener("mouseup", () => {
	mouseDown = false;
}, false)

scene.canvas.onmouseout	= function() {
	mouseDown = false;
}

function resizeCanvas() {
	scene.canvas.width = sceneElement.clientWidth;
	scene.canvas.height = sceneElement.clientHeight;
}

let currentTile: HTMLImageElement | null;
function tileClicked(tilePicked: HTMLImageElement) {
	if (tilePicked == currentTile) {
		currentTile.style.border = "none";
		currentTile = null;
		return;
	} else if (currentTile) {
		currentTile.style.border = "none";
	}

	tilePicked.style.border = "2px solid black";
	currentTile = tilePicked;
}

function getTileFromId(id: string): HTMLImageElement | HTMLDivElement | undefined {
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

function getBoxPosition(x: number, y: number) {
	const boxX = Math.floor(x / boxWidth);
	const boxY = Math.floor(y / boxHeight);
	return { boxX, boxY };
}

function checkIfBoxFilled(x: number, y: number) {
	for (const filledBox of filledBoxes) {
		if (filledBox.boxX == x && filledBox.boxY == y) {
			return true;
		}
	}
	return false;
}

const filledBoxes: {boxX: number, boxY: number, tileID: string}[] = [];
function renderBox(boxX: number, boxY: number, tileID: string) {
	const boxPositionX = boxWidth * boxX;
	const boxPositionY = boxHeight * boxY;

	scene.beginPath();
	scene.moveTo(boxPositionX, boxPositionY);
	scene.lineTo(boxPositionX + boxWidth, boxPositionY + boxHeight);
	scene.stroke();
	
	const tile = getTileFromId(tileID);
	if (tile) {
		if (tile instanceof HTMLImageElement) {
			const image = new Image();
			image.src = tile.src;
			image.sizes = "20px"
			scene.drawImage(image, boxPositionX, boxPositionY, boxWidth, boxHeight);
			scene.strokeRect(boxPositionX, boxPositionY, boxWidth, boxHeight);
			scene.fillStyle = "#000";
		} else {
			scene.fillStyle = "blue";
			scene.lineWidth = 1;
			scene.fillRect(boxPositionX, boxPositionY, boxWidth, boxHeight);
			scene.strokeRect(boxPositionX, boxPositionY, boxWidth, boxHeight);
			scene.fillStyle = "#000";
		}
	}
}

function fillBox(mouseX: number, mouseY: number) {
	const { boxX, boxY } = getBoxPosition(mouseX, mouseY);
	if (checkIfBoxFilled(boxX, boxY)) {
		return;
	}

	filledBoxes.push({
		boxX,
		boxY,
		tileID: currentTile?.dataset.tileid!
	});
}

function onMouseMove(event: MouseEvent) {
	if (!mouseDown) {
		return;
	}

	fillBox(event.offsetX, event.offsetY);
}

function onMouseDown(event: MouseEvent) {
	mouseDown = true;
	fillBox(event.offsetX, event.offsetY);
}

function update() {
	resizeCanvas();

	// Render vertical grid lines
	for (let i = 0; i < scene.canvas.width; i++) {
		scene.beginPath();
		scene.moveTo(boxWidth * i, 0);
		scene.lineTo(boxWidth * i, scene.canvas.height);
		scene.stroke();
	}

	// Render horizontal grid lines
	for (let i = 0; i < scene.canvas.width; i++) {
		scene.beginPath();
		scene.moveTo(0, boxHeight * i);
		scene.lineTo(scene.canvas.width, boxHeight*i);
		scene.stroke();
	}
	
	// Render all the blocks which have been filled
	for (const filledBox of filledBoxes) {
		renderBox(filledBox.boxX, filledBox.boxY, filledBox.tileID);
	}

	scene.fillStyle = "red";
	scene.fillRect(0, 0, 75, 75);

	requestAnimationFrame(update);
}

window.onload = function() {
	requestAnimationFrame(update);
}