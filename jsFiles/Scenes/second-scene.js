import Player from "../Player/player.js";

export default class SecondScene extends Phaser.Scene {
  constructor() {
    super("second-scene");
  }

  preload() {
    this.load.image("tiles", "assets/basictiles_og_scaled48.png");
    this.load.tilemapTiledJSON("map", "assets/tilemaps/secondScene.json");
    this.load.spritesheet("knight", "assets/spritesheets/32bit-knight.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.hasPlayerReachedStairs = false;
    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("basictiles_og_scaled48", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createLayer("Ground Layer", tileset, 0, 0);
    const worldLayer = map.createLayer("World Layer", tileset, 0, 0);
    // const aboveLayer = map.createLayer("Top Layer", tileset, 0, 0);

    // aboveLayer.setCollisionByProperty({ collides: true });
    worldLayer.setCollisionByProperty({ collides: true });

    const camera = this.cameras.main;

    // const newSpawn = map.findObject(
    //   "PlayerSpawn",
    //   (obj) => obj.name === "playerSpawn"
    // );
    this.player = new Player(this, 6, 33, camera);

    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(this.player.sprite);

    //watch for collisions
    // this.physics.add.collider(this.player.sprite, aboveLayer);
    this.physics.add.collider(this.player.sprite, worldLayer);

    //instructions text
    this.add
      .text(16, 16, "WASD to move, click to attack, spacebar to roll", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setScrollFactor(0);

    // this.worldLayer.setTileLocationCallback(23, 32, 48, 48, () => {
    //   this.worldLayer.setTileLocationCallback(6, 33, 48, 48, null);
    //   this.hasPlayerReachedStairs = true;
    //   this.player.freeze();
    //   const camera = this.cameras.main;
    //   camera.fade(250, 0, 0, 0);
    //   camera.once("camerafadeoutcomplete", () => {
    //     this.player.destroy();
    //     this.ascendScene();
    //   });
    // });

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // worldLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });
    // belowLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });
    // aboveLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });
  }

  //   ascendScene() {
  //     this.scene.start("startScene");
  //   }

  update(time, delta) {
    this.player.update();
  }
}
