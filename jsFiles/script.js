var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
let player;
let controls;
let game = new Phaser.Game(config);

function preload() {
  this.load.image("backgroundImage", "assets/backgroundImage.png");
  /* knight is 10 columns x 24 rows, 32x32 bits */
  this.load.spritesheet("knight", "assets/32bit-knight.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
}

function create() {
  this.add.image(400, 300, "backgroundImage");
  player = this.physics.add.sprite(400, 300, "knight");
  player.setScale(2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("knight", { start: 0, end: 3 }),
    frameRate: 2,
    repeat: -1,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("knight", { start: 10, end: 18 }),
    frameRate: 4,
    repeat: -1,
  });

  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("knight", { start: 20, end: 28 }),
    frameRate: 4,
    repeat: -1,
  });

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("knight", { start: 30, end: 38 }),
    frameRate: 4,
    repeat: -1,
  });

  this.anims.create({
    key: "down",
    frames: this.anims.generateFrameNumbers("knight", { start: 40, end: 48 }),
    frameRate: 4,
    repeat: -1,
  });

  controls = this.input.keyboard.createCursorKeys();
}
let speed = 100;
function update() {
  if (controls.left.isDown) {
    player.setVelocityX(-speed);
    player.setVelocityY(0);
    player.anims.play("left", true);
  } else if (controls.right.isDown) {
    player.setVelocityX(speed);
    player.setVelocityY(0);
    player.anims.play("right", true);
  } else if (controls.up.isDown) {
    player.setVelocityY(-speed);
    player.setVelocityX(0);
    player.anims.play("up", true);
  } else if (controls.down.isDown) {
    player.setVelocityY(speed);
    player.setVelocityX(0);
    player.anims.play("down", true);
  } else {
    player.setVelocityX(0);
    player.setVelocityY(0);
    player.anims.play("idle", true);
  player = this.physics.add.sprite(400, 300, "knight");
  player.setScale(2);
  player.setCollideWorldBounds(true);
  controls = this.input.keyboard.createCursorKeys();
}
let speed = 100;
function update() {
  if (controls.left.isDown) {
    player.setVelocityX(-speed);
  } else if (controls.right.isDown) {
    player.setVelocityX(speed);
  } else {
    player.setVelocityX(0);
  }

  if (controls.up.isDown) {
    player.setVelocityY(-speed);
  } else if (controls.down.isDown) {
    player.setVelocityY(speed);
  } else {
    player.setVelocityY(0);
  }
}
