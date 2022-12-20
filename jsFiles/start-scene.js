import Player from "./player.js";

export default class StartScene extends Phaser.Scene {
  preload() {
    this.load.image("tiles", "assets/basictiles_og_scaled48.png");
    this.load.image("tiles2", "assets/things_og_scaled48.png");
    this.load.tilemapTiledJSON("map", "assets/tilemaps/startScene.json");
    this.load.spritesheet("knight", "assets/spritesheets/32bit-knight.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    const map = this.make.tilemap({ key: "map" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("basictiles_og_scaled48", "tiles");
    const tileset2 = map.addTilesetImage("things_og_scaled48", "tiles2");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createLayer("Ground Layer", tileset, 0, 0);
    const worldLayer = map.createLayer("World Layer", tileset, 0, 0);
    const worldLayer2 = map.createLayer("Lever Layer", tileset2, 0, 0);
    const aboveLayer = map.createLayer("Top Layer", tileset, 0, 0);

    aboveLayer.setCollisionByProperty({ collides: true });
    worldLayer.setCollisionByProperty({ collides: true });

    const camera = this.cameras.main;

    const spawnPoint = map.findObject(
      "Spawn",
      (obj) => obj.name === "Spawn Point"
    );
    this.player = new Player(this, spawnPoint.x, spawnPoint.y, camera);

    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(this.player.sprite);

    //watch for collisions
    this.physics.add.collider(this.player.sprite, aboveLayer);
    this.physics.add.collider(this.player.sprite, worldLayer);

    //instructions text
    this.add
      .text(16, 16, "WASD to move, click to attack, spacebar to roll", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setScrollFactor(0);

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

  update(time, delta) {
    this.player.update();
  }
}
