import Player from "../Player/player.js";
import SecondEnemy from "../secondEnemy.js";
let isGameOver;
let music;
export default class StartScene extends Phaser.Scene {
  constructor() {
    super("start");
  }
  preload() {
    this.load.audio("level_music", "assets/audio/Alone.mp3");
    this.load.image("tiles", "assets/basictiles_og_scaled48.png");
    this.load.image("tiles2", "assets/things_og_scaled48.png");
    this.load.tilemapTiledJSON("map", "assets/tilemaps/startScene.json");
    this.load.spritesheet("knight", "assets/spritesheets/32bit-knight.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("skeleton", "assets/spritesheets/monsters.png", {
      frameWidth: 16,
      frameHeight: 16,
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

    // second enemy
    this.enemy = new SecondEnemy(this, 350, 400);
    this.physics.add.collider(this.enemy.sprite, worldLayer);
    this.physics.add.collider(this.enemy.sprite, aboveLayer);
    this.physics.add.collider(this.enemy.sprite, this.player.sprite);

    this.enemy4 = new SecondEnemy(this, 320, 350);
    this.physics.add.collider(this.enemy4.sprite, worldLayer);
    this.physics.add.collider(this.enemy4.sprite, aboveLayer);
    this.physics.add.collider(this.enemy4.sprite, this.player.sprite);

    // function handlePlayerEnemyCollision(player, enemy) {
    //   enemy.explode();
    // }

    // this.physics.add.overlap(this.player, this.enemies, handlePlayerEnemyCollision(this.player,this.enemy))

    // grouping enemies
    // this.enemyGroup = this.physics.add.group();
    // this.enemyGroup.add(this.enemy);
    // this.enemyGroup.add(this.enemy4);


    // this.physics.add.collider(enemyGroup,worldLayer);
    // this.physics.add.collider(enemyGroup, aboveLayer);
    // this.physics.add.collider(enemyGroup, this.player.sprite);



    //watch for collisions
    this.physics.add.collider(this.player.sprite, aboveLayer);
    this.physics.add.collider(this.player.sprite, worldLayer);

    //instructions text
    this.add
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

    //debug graphics here

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
    if (this.player.stateMachine.state === "dead") {
      //game over
      this.gameOver();
      return;
    }
    this.player.update();
    this.enemy.update();
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
    this.scene.restart();
  }
}
