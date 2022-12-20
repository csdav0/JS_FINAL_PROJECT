import DungeonScene from "./dungeon-gen.js";
import StartScene from "./start-scene.js";

// const config = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,
//   backgroundColor: "#000",
//   parent: "container",
//   pixelArt: true,
//   scene: DungeonScene,
//   physics: {
//     default: "arcade",
//     arcade: {
//       gravity: { y: 0 },
//       debug: false,
//     },
//   },
// };

// const game = new Phaser.Game(config);

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000",
  parent: "container",
  pixelArt: true,
  scene: StartScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
