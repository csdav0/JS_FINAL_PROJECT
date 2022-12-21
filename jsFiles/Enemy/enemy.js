export default class Enemy {
  constructor(scene, x, y) {
    this.scene = scene;
    const anims = scene.anims;
    const movementFrames = 16;
    this.isDead = false;

    anims.create({
      key: "sit-idle",
      frames: anims.generateFrameNumbers("spider", {
        start: 0,
        end: 3,
      }),
      repeat: -1,
      frameRate: movementFrames,
    });

    this.sprite = scene.physics.add.sprite(x, y, "spider");
    this.speed = 20;

    let dir = Math.floor(Math.random() * 4);
    console.log(dir);
    if (dir === 0) {
      // up
      this.sprite.body.setVelocity(0, -this.speed);
      this.sprite.anims.play("spider-sit-idle");
    } else if (dir === 1) {
      // left
      this.sprite.body.setVelocity(-this.speed, 0);
      this.sprite.anims.play("spider-sit-idle");
    } else if (dir === 2) {
      // down
      this.sprite.body.setVelocity(0, this.speed);
      this.sprite.anims.play("spider-sit-idle");
    } else {
      this.sprite.body.setVelocity(this.speed, 0);
      this.sprite.anims.play("spider-sit-idle");
    }
  }

  explode() {
    if (!this.isDead) {
      this.isDead = true;
      this.destroy();
      // console.log('entity explode');
    }
  }

  update() {
    const sprite = this.sprite;
    const { speed } = this;
    const enemyBlocked = sprite.body.blocked;
    this.sprite.anims.play("spider-sit-idle");
    if (
      enemyBlocked.down ||
      enemyBlocked.up ||
      enemyBlocked.left ||
      enemyBlocked.right
    ) {
      let possibleDirections = [];
      for (const direction in enemyBlocked) {
        possibleDirections.push(direction);
      }
      const newDirection =
        possibleDirections[Math.floor(Math.random() * 4) + 1];

      if (newDirection === "up") {
        this.sprite.body.setVelocity(0, -this.speed);
        this.sprite.anims.play("spider-sit-idle");
      } else if (newDirection === "left") {
        this.sprite.body.setVelocity(-this.speed, 0);
        this.sprite.anims.play("spider-sit-idle");
      } else if (newDirection === "down") {
        this.sprite.body.setVelocity(0, this.speed);
        this.sprite.anims.play("spider-sit-idle");
      } else if (newDirection === "right") {
        this.sprite.body.setVelocity(0, -this.speed);
        this.sprite.anims.play("spider-sit-idle");
      } else if (newDirection === "none") {
        this.sprite.body.setVelocity(0, this.speed);
        this.sprite.anims.play("spider-sit-idle");
      }
    }
  }
}