import State from "./State.js";

export default class RollingState extends State {
  execute(scene, sprite) {
    sprite.anims.play("roll", true);
    sprite.once("animationcomplete", () => {
      this.stateMachine.transition("idle");
    });
  }
}
