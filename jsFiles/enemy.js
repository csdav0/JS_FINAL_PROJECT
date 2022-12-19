export default class Enemy {
    constructor(scene, x, y) {
        this.scene = scene;
        const anims = scene.anims;
        const movementFrames = 12;

        anims.create({
            key: "sit-idle",
            frames: anims.generateFrameNumbers("spider",
                {
                    start: 0, end: 3
                }),
            repeat: -1,
            frameRate: movementFrames,
        });

        this.sprite = scene.physics.add.sprite(x, y, "spider");
    }

    update() {
        this.sprite.anims.play("sit-idle",true);
    }
}