import { Renderer } from "./renderer";

const gameScripts = [
    "gameSrc/mathfunctions.js",
    "gameSrc/collision.js",
    "gameSrc/chunks.js",
    "gameSrc/drawlevel.js",
    "gameSrc/level_objects.js",
    "gameSrc/Player.js",
    "gameSrc/playercollisions.js",
    "gameSrc/particle.js",
    "gameSrc/explode.js",
    "gameSrc/drawobjects.js",
    "gameSrc/chunk.js",
    "gameSrc/findLongestSubArray.js",
    "gameSrc/cookies.js",
    "gameSrc/index.js"
];

const loadedScripts: HTMLScriptElement[] = [];

function loadGameScripts() {
    for (const gameScript of gameScripts) {
        const scriptElement = document.createElement("script");
        scriptElement.src = gameScript;
        document.body.appendChild(scriptElement);
        loadedScripts.push(scriptElement);
    }
}

export function playLevel(useBaseLevels: boolean) {
    const editorCanvas = document.getElementById("scene") as HTMLCanvasElement;
    const gameCanvas = document.getElementById("canvas") as HTMLCanvasElement;
    editorCanvas.style.display = "none";
    gameCanvas.style.display = "block";
    Renderer.isTicking = false;
    loadGameScripts();
}