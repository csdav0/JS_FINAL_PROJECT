import Player from "./player.js";

/**
 * Scene that generates a new dungeon
 */
export default class Scene extends Phaser.Scene {
  preload() {
    /* songs: 
  dungeon bop - alone, 7th realm, 
  spooky dungeon - claustrophobia,
  boss - attack4
  ali's fairy in love and war - fairy shop ?
  */
    this.load.audio("dungeon-main", "assets//audio/Alone.mp3");
    /* Placeholder background image in order to help see animations */
    this.load.image("background", "assets/background.png");
    /* knight is 10 columns x 24 rows, 32x32 bits */
    this.load.spritesheet("knight", "assets/spritesheets/32bit-knight.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    const music = this.sound.add("dungeon-main", { loop: true });
    //music.play();

    this.add.image(400, 300, "background");
    // Place the player in the center of the map.
    const camera = this.cameras.main;
    this.player = new Player(this, 400, 300, camera);
    camera.startFollow(this.player.sprite);
    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, "WASD to move, click to attack, spacebar to roll", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setScrollFactor(0);
  }

  update() {
    this.player.update();
  }
}
