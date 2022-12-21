import Player from "../Player/player.js";
let isGameOver;
let music;
export default class StartScene extends Phaser.Scene {
  constructor() {
    super("start");
  }
  preload() {
    this.load.audio("level_music", "assets/audio/Alone.mp3");
    this.load.image("tiles", "assets/tilesets/basictiles_og_scaled48.png");
    this.load.image("tiles2", "assets/tilesets/things_og_scaled48.png");
    this.load.tilemapTiledJSON("map", "assets/tilemaps/startScene.json");
    this.load.spritesheet("knight", "assets/spritesheets/32bit-knight.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    music = this.sound.add("level_music");
    music.play();
    const map = this.make.tilemap({ key: "map" });
    isGameOver = false;
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

    // how to play
    this.addControlsText(this);

    //debug graphics here
    // this.showCollision(worldLayer, belowLayer, aboveLayer);
  }

  update(time, delta) {
    if (this.player.stateMachine.state === "dead") {
      //game over
      this.gameOver();
      return;
    }
    this.player.update();
  }

  gameOver() {
    if (isGameOver) {
      return;
    }
    music.stop();
    isGameOver = true;
    this.add
      .text(384, 284, "GAME OVER", {
        font: "18px monospace",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    this.time.addEvent({
      delay: 5000,
      callback: this.restartGame,
      callbackScope: this,
    });
  }

  restartGame() {
    this.scene.start("title");
  }

  addControlsText(scene) {
    scene.add
      .text(
        16,
        16,
        "WASD to move, Click to attack, Spacebar to roll, F to die and restart",
        {
          font: "18px monospace",
          fill: "#ffffff",
          padding: { x: 20, y: 10 },
        }
      )
      .setScrollFactor(0);
  }

  showCollision(worldLayer, belowLayer, aboveLayer) {
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
    aboveLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    });
  }
}
