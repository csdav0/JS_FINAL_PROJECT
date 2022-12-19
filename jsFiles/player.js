/* Player class needs the scene it's in, it's x, y location, and the camera object from scene */

export default class Player {
  constructor(scene, x, y, camera) {
    this.scene = scene;
    this.camera = camera;
    const anims = scene.anims;
    const attackFrames = 16;
    const movementFrames = 16;

    //attack anims
    anims.create({
      key: "attack-right",
      frames: anims.generateFrameNumbers("knight", {
        start: 160,
        end: 165,
      }),
      frameRate: attackFrames,
    });

    anims.create({
      key: "attack-up",
      frames: anims.generateFrameNumbers("knight", {
        start: 170,
        end: 175,
      }),
      frameRate: attackFrames,
    });

    anims.create({
      key: "attack-left",
      frames: anims.generateFrameNumbers("knight", {
        start: 180,
        end: 185,
      }),
      frameRate: attackFrames,
    });

    anims.create({
      key: "attack-down",
      frames: anims.generateFrameNumbers("knight", {
        start: 190,
        end: 195,
      }),
      frameRate: attackFrames,
    });
    //movement anims
    anims.create({
      key: "walk-up",
      frames: anims.generateFrameNumbers("knight", { start: 20, end: 27 }),
      frameRate: movementFrames,
    });

    anims.create({
      key: "walk-right",
      frames: anims.generateFrameNumbers("knight", { start: 10, end: 17 }),
      frameRate: movementFrames,
    });

    anims.create({
      key: "walk-left",
      frames: anims.generateFrameNumbers("knight", { start: 30, end: 37 }),
      frameRate: movementFrames,
    });

    anims.create({
      key: "walk-down",
      frames: anims.generateFrameNumbers("knight", { start: 40, end: 47 }),
      frameRate: movementFrames,
    });
    //roll anim
    anims.create({
      key: "roll",
      frames: anims.generateFrameNumbers("knight", {
        start: 110,
        end: 117,
      }),
      frameRate: movementFrames,
    });
    //death anim face-down
    anims.create({
      key: "die-face-down",
      frames: anims.generateFrameNumbers("knight", {
        start: 150,
        end: 157,
      }),
      frameRate: 4,
      repeat: 0,
    });

    this.sprite = scene.physics.add.sprite(x, y, "knight", 0).setScale(2);
    this.sprite.body.setSize(22, 14, 10, 18);
    this.controls = scene.input.keyboard.addKeys("W,A,S,D,F,SPACE");
    this.mouse = scene.input.activePointer;
  }
  update() {
    const controls = this.controls;
    let mouse = this.mouse;

    //update mouse.worldX and mouse.worldY when the camera moves
    mouse.updateWorldPoint(this.camera);

    const sprite = this.sprite;
    const playerSpeed = 160;
    const rollVelocity = playerSpeed * 0.5;
    const previousVelocity = sprite.body.velocity.clone();

    //X Delta is positive if the mouse is further right on the screen than the knight
    const mouseAndSpriteXDelta = mouse.worldX - sprite.x;
    //Y Delta is positive if the mouse is further left on the screen than the knight
    const mouseAndSpriteYDelta = mouse.worldY - sprite.y;

    sprite.body.setVelocity(0);

    // movement
    // horizonal is prioritized over vertical
    if (controls.A.isDown) {
      sprite.body.setVelocityX(-playerSpeed);
      sprite.setFlipX(true);
    }
    if (controls.D.isDown) {
      sprite.body.setVelocityX(playerSpeed);
      sprite.setFlipX(false);
    }

    // Vertical movement
    else if (controls.W.isDown) {
      sprite.body.setVelocityY(-playerSpeed);
    } else if (controls.S.isDown) {
      sprite.body.setVelocityY(playerSpeed);
    }

    // normalize sets diagonal movement to the same playerSpeed as up, down, left, and right
    sprite.body.velocity.normalize().scale(playerSpeed);

    /* Animations priority
    Attacking
    Rolling
    General Movement
    */

    // attacking based on mouse location compared to knight
    if (mouse.isDown) {
      //moving left causes setFlipX to be true, we need to setLipX to false anytime we attack, since our attacks are based on X,Y
      sprite.setFlipX(false);
      if (mouseAndSpriteXDelta > 0) {
        if (mouseAndSpriteXDelta > mouseAndSpriteYDelta) {
          sprite.anims.play("attack-right", true);
        } else {
          sprite.anims.play("attack-down", true);
        }
      } else {
        if (mouseAndSpriteXDelta < mouseAndSpriteYDelta) {
          sprite.anims.play("attack-left", true);
        } else {
          sprite.anims.play("attack-up", true);
        }
      }
    }

    //rolling
    else if (controls.SPACE.isDown) {
      sprite.anims.play("roll", true);
      if (controls.D.isDown) {
        sprite.setVelocityX(playerSpeed + rollVelocity);
      } else if (controls.A.isDown) {
        sprite.setVelocityX(-playerSpeed - rollVelocity);
      } else if (controls.S.isDown) {
        sprite.setVelocityY(playerSpeed + rollVelocity);
      } else if (controls.W.isDown) {
        sprite.setVelocityY(-playerSpeed - rollVelocity);
      }
    }
    // Update the movement animation last
    else if (controls.A.isDown || controls.D.isDown) {
      sprite.anims.play("walk-right", true);
    } else if (controls.W.isDown) {
      sprite.anims.play("walk-up", true);
    } else if (controls.S.isDown) {
      sprite.anims.play("walk-down", true);
    } else {
      sprite.anims.stop();
      // Idle frame
      previousVelocity.x < 0
        ? sprite.setTexture("knight", 210)
        : sprite.setTexture("knight", 200);
    }

    //if you die
    //   player.anims.play("die-face-down", false);
  }

  destroy() {
    this.sprite.destroy();
  }
}
