export default class SecondEnemy {
    constructor(scene, x, y) {
        this.scene = scene
        const anims = scene.anims
        const movementFrames = 12;
        this.isDead = false
        this.speed = 15;

        anims.create({
            key: "sit-idle",
            frames: anims.generateFrameNumbers("skeleton",
                {
                    start: 28, end: 29
                }),
            repeat: -1,
            frameRate: movementFrames,
        });

        anims.create({
            key: "walk-left",
            frames: anims.generateFrameNumbers("skeleton",
                {
                    start: 28, end: 33
                }),
            repeat: -1,
            frameRate: movementFrames,
        });

        this.sprite = scene.physics.add.sprite(x, y, "skeleton", 0).setScale(2);

        let dir = Math.floor(Math.random() * 4)
        console.log(dir);
        if (dir === 0) {
            // up
            this.sprite.body.setVelocity(0, -this.speed)
            this.sprite.anims.play("sit-idle")
        } else if (dir === 1) {
            // left
            this.sprite.body.setVelocity(-this.speed, 0)
            this.sprite.anims.play("walk-left")
        }
        else if (dir === 2) {
            // down
            this.sprite.body.setVelocity(0, this.speed)
            this.sprite.anims.play("sit-idle")
        }
        else {
            // right
            this.sprite.body.setVelocity(this.speed, 0)
            this.sprite.anims.play("sit-idle")
        }
    }
    update() {
        const sprite = this.sprite;
        sprite.anims.play("sit-idle", true);
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
                this.sprite.anims.play("sit-idle")

            } else if (newDirection === 'left') {
                this.sprite.body.setVelocity(-this.speed, 0)
                this.sprite.anims.play("walk-left")

            } else if (newDirection === 'down') {
                this.sprite.body.setVelocity(0, this.speed)
                this.sprite.anims.play("sit-idle")

            } else if (newDirection === 'right') {
                this.sprite.body.setVelocity(0, -this.speed)
                this.sprite.anims.play("sit-idle")

            } else if(newDirection === 'none'){
                this.sprite.body.setVelocity(0, this.speed);
                this.sprite.anims.play("sit-idle")
            }
        }
    }

    explode(){
        if (!this.isDead){
            this.isDead = true
            this.sprite.destroy()
        }
    }
}
