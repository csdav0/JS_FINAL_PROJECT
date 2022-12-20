let music;
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("title");
  }
  preload() {
    this.load.audio("title_music", "assets/audio/7th Realm.mp3");
    this.load.image(
      "title_screen_background",
      "assets/spritesheets/title_screen_background.png"
    );
  }

  create() {
    this.mouse = this.input.activePointer;
    music = this.sound.add("title_music", { loop: true });
    music.play();
    this.add.sprite(0, 0, "title_screen_background").setOrigin(0, 0);
    this.add
      .text(260, 225, "SET IN STONE", {
        font: "48px monospace",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    this.add
      .text(400, 300, "PLAY", {
        font: "18px monospace",
        fill: "#ffffff",
      })
      .setScrollFactor(0);
  }

  update() {
    //console.log(`Mouse x: ${this.mouse.x} Mouse y: ${this.mouse.y}`);
    if (this.mouse.x >= 390 && this.mouse.x <= 440) {
      if (this.mouse.y >= 299 && this.mouse.y <= 320) {
        if (this.mouse.isDown) {
          music.stop();
          console.log("Clicked play, transitioning scene...");
          this.scene.start("start");
        }
      }
    }
  }
}
