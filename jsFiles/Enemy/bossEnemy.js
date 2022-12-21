export default class BossEnemy {
    constructor(scene, x, y) {
        this.scene = scene
        const anims = scene.anims
        const movementFrames = 12;
        this.isDead = false
        this.speed = 25;

        anims.create({
            key: "boss-sit-idle",
            frames: anims.generateFrameNumbers("boss",
                {
                    start: 1, end: 1
                }),
            repeat: -1,
            frameRate: movementFrames,
        });

        anims.create({
            key: "boss-walk-left",
            frames: anims.generateFrameNumbers("boss",
                {
                    start: 1, end: 1
                }),
            repeat: -1,
            frameRate: movementFrames,
        });

        anims.create({
            key: "boss-walk-right",
            frames: anims.generateFrameNumbers("boss",
                {
                    start: 1, end: 1
                }),
            repeat: -1,
            frameRate: movementFrames,
        });

        anims.create({
            key: "boss-walk-down",
            frames: anims.generateFrameNumbers("boss",
                {
                    start: 1, end: 1
                }),
            repeat: -1,
            frameRate: movementFrames,
        });

        anims.create({
            key: "boss-walk-up",
            frames: anims.generateFrameNumbers("boss",
                {
                    start: 1, end: 1
                }),
            repeat: -1,
            frameRate: movementFrames,
        });

        this.sprite = scene.physics.add.sprite(x, y, "boss").setScale(4);

        let dir = Math.floor(Math.random() * 4)
        console.log(dir);
        if (dir === 0) {
            // up
            this.sprite.body.setVelocity(0, -this.speed)
            this.sprite.anims.play("boss-walk-up")
        } else if (dir === 1) {
            // left
            this.sprite.body.setVelocity(-this.speed, 0)
            this.sprite.anims.play("boss-walk-left")
        }
        else if (dir === 2) {
            // down
            this.sprite.body.setVelocity(0, this.speed)
            this.sprite.anims.play("boss-walk-down")
        }
        else {
            // right
            this.sprite.body.setVelocity(this.speed, 0)
            this.sprite.anims.play("boss-walk-right")
        }
    }
    update() {
        const sprite = this.sprite;
        const { speed } = this;
        const enemyBlocked = sprite.body.blocked;

        if (enemyBlocked.down || enemyBlocked.up || enemyBlocked.left || enemyBlocked.right) {

            let possibleDirections = []
            for (const direction in enemyBlocked) {
                possibleDirections.push(direction)
            }
            const newDirection = possibleDirections[Math.floor(Math.random() * 4) + 1]
            if (newDirection === 'up') {
                this.sprite.body.setVelocity(0, -this.speed)
                this.sprite.anims.play("boss-walk-up")

            } else if (newDirection === 'left') {
                this.sprite.body.setVelocity(-this.speed, 0)
                this.sprite.anims.play("boss-walk-left")

            } else if (newDirection === 'down') {
                this.sprite.body.setVelocity(0, this.speed)
                this.sprite.anims.play("boss-walk-down")

            } else if (newDirection === 'right') {
                this.sprite.body.setVelocity(0, -this.speed)
                this.sprite.anims.play("boss-walk-right")

            } else if (newDirection === 'none') {
                this.sprite.body.setVelocity(0, this.speed);
                this.sprite.anims.play("boss-walk-right")
            }
        }
    }

    explode() {
        if (!this.isDead) {
            this.isDead = true
            this.sprite.destroy()
        }
    }
}