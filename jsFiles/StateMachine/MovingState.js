import State from "./State.js";

export default class MovingState extends State {
  execute(scene, sprite) {
    const playerSpeed = 160;
    this.controls = scene.input.keyboard.addKeys("W,A,S,D,F,SPACE");
    this.mouse = scene.input.activePointer;
    if (this.controls.SPACE.isDown) {
      this.stateMachine.transition("rolling");
      return;
    }

    if (this.mouse.isDown) {
      this.stateMachine.transition("attacking");
      return;
    }
    if (
      !(
        this.controls.W.isDown ||
        this.controls.A.isDown ||
        this.controls.S.isDown ||
        this.controls.D.isDown
      )
    ) {
      this.stateMachine.transition("idle");
      return;
    }

    sprite.setVelocity(0);

    // movement
    // horizonal is prioritized over vertical
    if (this.controls.A.isDown) {
      sprite.body.setVelocityX(-playerSpeed);
      sprite.direction = "left";
    } else if (this.controls.D.isDown) {
      sprite.body.setVelocityX(playerSpeed);
      sprite.direction = "right";
    }

    // Vertical movement
    else if (this.controls.W.isDown) {
      sprite.body.setVelocityY(-playerSpeed);
      sprite.direction = "up";
    } else if (this.controls.S.isDown) {
      sprite.body.setVelocityY(playerSpeed);
      sprite.direction = "down";
    }
    sprite.anims.play(`walk-${sprite.direction}`, true);
    // normalize sets diagonal movement to the same playerSpeed as up, down, left, and right
    sprite.body.velocity.normalize().scale(playerSpeed);
  }
}
