import State from "./State.js";
export default class IdleState extends State {
  enter(scene, sprite) {
    const previousVelocity = sprite.body.velocity.clone();
    sprite.body.setVelocity(0);
    // Idle frame
    previousVelocity.x < 0
      ? sprite.setTexture("knight", 210)
      : sprite.setTexture("knight", 200);
    sprite.anims.stop();
  }

  execute(scene, sprite) {
    this.controls = scene.input.keyboard.addKeys("W,A,S,D,F,SPACE");
    this.mouse = scene.input.activePointer;

    if (
      this.controls.W.isDown ||
      this.controls.A.isDown ||
      this.controls.S.isDown ||
      this.controls.D.isDown
    ) {
      this.stateMachine.transition("moving");
      return;
    }

    if (this.controls.SPACE.isDown) {
      this.stateMachine.transition("rolling");
      return;
    }

    if (this.mouse.isDown) {
      this.stateMachine.transition("attacking");
      return;
    }
  }
}
