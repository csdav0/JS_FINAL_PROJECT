import StateMachine from "./StateMachine.js";
import AttackingState from "./AttackingState.js";
import IdleState from "./IdleState.js";
import MovingState from "./MovingState.js";
import RollingState from "./RollingState.js";

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
      repeat: -1,
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
    this.sprite.body.setSize(17, 10, 15, 22);
    this.sprite.direction = "right";
    this.controls = scene.input.keyboard.addKeys("W,A,S,D,F,SPACE");
    this.mouse = scene.input.activePointer;

    this.stateMachine = new StateMachine(
      "idle",
      {
        idle: new IdleState(),
        attacking: new AttackingState(),
        rolling: new RollingState(),
        moving: new MovingState(),
      },
      [this.scene, this.sprite]
    );
  }
  update() {
    //update mouse.worldX and mouse.worldY when the camera moves
    this.mouse.updateWorldPoint(this.camera);

    //In order to make the knight move smoothly, you can either roll, move, or attack

    /* Animations priority
    Attacking
    Rolling
    General Movement
    */

    this.stateMachine.step();

    //if you die
    //   player.anims.play("die-face-down", false);
  }

  destroy() {
    this.sprite.destroy();
  }
}
