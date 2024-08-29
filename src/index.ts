const sceneElement = document.getElementById("scene") as HTMLCanvasElement;
const scene = sceneElement.getContext("2d") as CanvasRenderingContext2D; // Cast this because it will always be available


function resizeCanvas() {
    scene.canvas.width = sceneElement.clientWidth;
    scene.canvas.height = sceneElement.clientHeight;
}

function update() {
    resizeCanvas();

    const boxWidth = 10;
    const boxHeight = 10;

    for (let i = 0; i < scene.canvas.width; i += boxWidth) {
        scene.beginPath();
        scene.moveTo(boxWidth*i, 0);
        scene.lineTo(boxWidth*i, scene.canvas.height);
        scene.stroke();
    }

    for (let i = 0; i < scene.canvas.width; i += boxWidth) {
        scene.beginPath();
        scene.moveTo(0, boxHeight*i);
        scene.lineTo(scene.canvas.width, boxHeight*i);
        scene.stroke();
    }

    scene.fillStyle = "red";
    scene.fillRect(0, 0, 75, 75);

    requestAnimationFrame(update);
}

window.onload = function() {
    requestAnimationFrame(update);
}