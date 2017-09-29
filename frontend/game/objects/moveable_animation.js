import * as PIXI from 'pixi.js';
import * as SAT from 'sat';
import AnimatedObject from './animated.js';

class MoveableAnimation extends AnimatedObject {
    constructor(anim_dict) {
        super(anim_dict);

        this.is_moving = false;

        // should be changed to a direction => ('n', 'ne' 'e' etc...)
        this.want_to_move = null;
    }

    collision_check(nextpos) {
        // now move the hitbox from this obj in the nextpos for check
        var last_x = this.hitbox.ground.pos.x;
        var last_y = this.hitbox.ground.pos.y;
        //this.hitbox.ground.pos.x = nextpos.x + this.pivot.x;
        this.hitbox.ground.pos.x = nextpos.x;
        //this.hitbox.ground.pos.y = nextpos.y + this.pivot.y;
        this.hitbox.ground.pos.y = nextpos.y;
        //this.helper_hitbox.position.x = this.hitbox.ground.pos.x;
        //this.helper_hitbox.position.y = this.hitbox.ground.pos.y;
        //for (let collide_obj in viewport.objects.children) {
        for (let child_num in this.parent.children) {
            if ((this.parent.children[child_num] !== this) && (this.parent.children[child_num].hitbox.ground != null)) {
                var response = new SAT.Response();
                var collided = SAT.testPolygonPolygon(this.hitbox.ground, this.parent.children[child_num].hitbox.ground, response);
                if (collided) {
                    return {'collided': collided, 'response': response};
                }
            }
        }
        // reset hitbox position
        this.hitbox.ground.pos.x = last_x;
        this.hitbox.ground.pos.y = last_y;
        return {'collided': false, 'response': null};
    }
    // should only be called by the update loop
    move(direction) {
        var nextpos = this.position;
        if (direction == 'n') {
            nextpos.y -= this.velocity.y;
        }
        if (direction == 'ne') {
            nextpos.y -= this.velocity.y/2;
            nextpos.x += this.velocity.x/2;
        }
        if (direction == 'e') {
            nextpos.x += this.velocity.x;
        }
        if (direction == 'se') {
            nextpos.y += this.velocity.y/2;
            nextpos.x += this.velocity.x/2;
        }
        if (direction == 's') {
            nextpos.y += this.velocity.y;
        }
        if (direction == 'sw') {
            nextpos.y += this.velocity.y/2;
            nextpos.x -= this.velocity.x/2;
        }
        if (direction == 'w') {
            nextpos.x -= this.velocity.x;
        }
        if (direction == 'nw') {
            nextpos.y -= this.velocity.y/2;
            nextpos.x -= this.velocity.x/2;
        }
        var collision_result = this.collision_check(nextpos);
        if (!(collision_result.collided)) {
            this.position = nextpos;
            this.hitbox.ground.pos.x = nextpos.x;
            this.hitbox.ground.pos.y = nextpos.y;
        } else {
            this.position.x -= collision_result.response.overlapV.x;
            this.position.y -= collision_result.response.overlapV.y;
            this.hitbox.ground.pos.x -= collision_result.response.overlapV.x;
            this.hitbox.ground.pos.y -= collision_result.response.overlapV.y;
        }
    };
}

export default MoveableAnimation;