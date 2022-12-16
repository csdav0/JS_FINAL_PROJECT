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
