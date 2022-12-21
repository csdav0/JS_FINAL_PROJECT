import StartScene from "./Scenes/start-scene.js";
import TitleScene from "./Scenes/title-scene.js";
import DungeonScene from "./Scenes/dungeon-gen.js";

// Prodecurally generated map from library
import SecondScene from "./second-scene.js";

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

// Manually generated map

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000",
  parent: "container",
  pixelArt: true,
  scene: [TitleScene, StartScene, SecondScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
