import StartScene from "./Scenes/start-scene.js";
import TitleScene from "./Scenes/title-scene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000",
  parent: "container",
  pixelArt: true,
  scene: [TitleScene, StartScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
