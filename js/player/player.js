import {game} from "../game.js";
import {BaseEntity} from "../entities/base_entity.js";
import {Bullet} from "../entities/bullet.js";
import {Body} from "../physics/body.js"

export {
    Player
}

/** Represents, well, player */
class Player extends BaseEntity {
    constructor() {
        super(new Body(300, 300, game.constants.playerDim, game.constants.playerDim), 0, 0,
            game.assets["playerSprite"]
        )
        this.health = 100;
        this.fireState = 0;
        this.shieldSprite = game.assets["playerShield"]
        this.shieldAddSize = 10;
        this.dShieldSize = 0.2;
    }

    preUpdate() {
        this.fireState++;
        if (this.fireState === game.constants.playerFramesPerBullet) {
            this.fireState = 0
            game.entities.push(new Bullet(this.body.centerX - game.constants.bulletWidth / 2, this.body.posY, false))
        }
    }

    calculateMovement() {
        // Calculate coordinates change
        if (game.isPressed.left && this.dx > -game.constants.playerMaxSpeed) {
            this.dx -= game.constants.playerAcceleration
        }
        if (game.isPressed.right && this.dx < game.constants.playerMaxSpeed) {
            this.dx += game.constants.playerAcceleration
        }
        if (game.isPressed.down && this.dy < game.constants.playerMaxSpeed) {
            this.dy += game.constants.playerAcceleration
        }
        if (game.isPressed.up && this.dy > -game.constants.playerMaxSpeed) {
            this.dy -= game.constants.playerAcceleration
        }

        // Apply velocity
        this.dx *= game.constants.playerVelocity
        this.dy *= game.constants.playerVelocity

        // Check bounds
        if (this.body.posX + this.dx < 0 || this.body.posX + this.body.width + this.dx > game.viewport.width) {
            this.dx = 0;
        }
        if (this.body.posY + this.dy < 0 || this.body.posY + this.body.height + this.dy > game.viewport.height) {
            this.dy = 0;
        }
    }

    render(ctx) {
        // Render shield
        ctx.drawImage(this.shieldSprite, this.body.posX - this.shieldAddSize / 2,
            this.body.posY - this.shieldAddSize / 2,
            this.body.width + this.shieldAddSize, this.body.height + this.shieldAddSize)
        this.shieldAddSize += this.dShieldSize
        if (this.shieldAddSize > 17 || this.shieldAddSize < 10) {
            this.dShieldSize = -this.dShieldSize;
        }

        // Render ship
        ctx.drawImage(this.sprite, this.body.posX, this.body.posY, this.body.width, this.body.height)
    }

}