import State from "./State.js";

export default class DeadState extends State {
  execute(scene, sprite) {
    sprite.anims.play("die-face-down", true);
  }
}
