export default class Enemy {
    constructor(scene, x, y) {
        this.scene = scene;
        const anims = scene.anims;
        const attackFrames = 12;
        const movementFrames = 12;

        anims.create({
            key: "sit_idle",
            frames: anims.generateFrameNumbers("spider", { start: 1, end: 3 }),
            repeat:-1,
            frameRate: movementFrames,
        });

        

        this.sprite = scene.physics.add.sprite(x, y, "spider").setScale(1);
    }


    update() {

    }
}