import {BaseEntity} from "./base_entity.js";

export {
    BaseBullet
}

/**Base class for every bullet.
 * Body's rotation always equals to the speed Vector angle.
 */
class BaseBullet extends BaseEntity {
    /**
     * @param body Body representing physical pos
     * @param sprite sprite to render
     * @param damage damage on hit
     */
    constructor(body, sprite, damage) {
        super(body, sprite)
        this.damage = damage
    }

    /**Hits the target with specified damage.
     * Bullet is destroyed after hit.
     * Should be called by CollisionRule.
     *
     * @param target gameObject to be hit
     */
    hit(target) {
        if ("receiveDamage" in target) {
            target.receiveDamage(this.damage)
        } else {
            target.destroy()
        }

        this.destroy()
    }

    update() {
        super.update();
        this.body.rotation = this.body.speed.angle // set rotation according to speed vector angle
    }
}