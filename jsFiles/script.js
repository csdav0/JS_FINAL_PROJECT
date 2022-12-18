import Scene from "./canvas_scene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  parent: "game-container",
  pixelArt: true,
  scene: Scene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
};
const game = new Phaser.Game(config);
