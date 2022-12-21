import Player from "../Player/player.js";

let music;
export default class SecondScene extends Phaser.Scene {
  constructor() {
    super("second");
  }

  preload() {
    this.load.audio("boss_song", "assets/audio/Attack4.mp3");
    this.load.image("tiles", "assets/basictiles_og_scaled48.png");
    this.load.tilemapTiledJSON(
      "secondLevel",
      "assets/tilemaps/secondScene.json"
    );
    this.load.spritesheet("knight", "assets/spritesheets/32bit-knight.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    music = music = this.sound.add("boss_song");
    music.play();
    this.hasPlayerReachedStairs = false;
    const map = this.make.tilemap({ key: "secondLevel" });

    const tileset = map.addTilesetImage("basictiles_og_scaled48", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createLayer("Ground Layer", tileset, 0, 0);
    const worldLayer = map.createLayer("World Layer", tileset, 0, 0);

    belowLayer.setCollisionByProperty({ collides: true });
    worldLayer.setCollisionByProperty({ collides: true });

    const camera = this.cameras.main;

    const newSpawn = map.findObject(
      "PlayerSpawn",
      (obj) => obj.name === "playerSpawn"
    );
    this.player = new Player(this, newSpawn.x, newSpawn.y, camera);

    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(this.player.sprite);

    //watch for collisions
    this.physics.add.collider(this.player.sprite, belowLayer);
    this.physics.add.collider(this.player.sprite, worldLayer);

    //instructions text
    this.add
      .text(16, 16, "WASD to move, click to attack, spacebar to roll", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setScrollFactor(0);

    worldLayer.setTileLocationCallback(6, 33, 1, 1, () => {
      worldLayer.setTileLocationCallback(6, 33, 1, 1, null);
      this.hasPlayerReachedStairs = true;
      const camera = this.cameras.main;
      music.stop();
      camera.fade(250, 0, 0, 0);
      camera.once("camerafadeoutcomplete", () => {
        this.ascendScene();
      });
    });

    //this.setDebug(worldLayer, belowLayer);
  }

  ascendScene() {
    this.scene.start("start");
  }

  update(time, delta) {
    this.player.update();
  }

  setDebug(worldLayer, belowLayer) {
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    worldLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    });
    belowLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    });
  }
}
