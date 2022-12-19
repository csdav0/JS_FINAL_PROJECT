import State from "./State.js";

export default class AttackingState extends State {
  execute(scene, sprite) {
    this.mouse = scene.input.activePointer;
    //X Delta is positive if the mouse is further right on the screen than the knight
    const mouseAndSpriteXDelta = this.mouse.worldX - sprite.x;
    //Y Delta is positive if the mouse is further left on the screen than the knight
    const mouseAndSpriteYDelta = this.mouse.worldY - sprite.y;
    sprite.setVelocity(0);
    // attacking based on mouse location compared to knight
    //moving left causes setFlipX to be true, we need to setFlipX to false anytime we attack, since our attacks are based on X,Y
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
    sprite.once("animationcomplete", () => {
      this.stateMachine.transition("idle");
    });
  }
}
