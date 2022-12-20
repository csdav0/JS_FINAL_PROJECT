

export default class Enemy {
    constructor(scene, x, y) {
        this.scene = scene;
        const anims = scene.anims;
        const movementFrames = 16;

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

        // cursors = this.input.keyboard.createCursorKeys();
        const controls = this.controls;
        let mouse = this.mouse;
        const sprite = this.sprite;
        const enemySpeed = 160;


        sprite.anims.play("sit-idle", true);
        sprite.body.setVelocity(-100);

        // if (controls.up.isDown) {
        //     this.sprite.body.setVelocityY(-100);
        // } else if (controls.down.isDown) {
        //     this.sprite.body.setVelocityY(100);
        // }
    }
}