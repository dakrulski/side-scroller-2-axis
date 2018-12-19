import { random_element_from_list } from '../system/functions.js';
import MoveableAnimation from './moveable_animation.js';

class Person extends MoveableAnimation {
    constructor(anim_dict) {
        super(anim_dict);
        this.state = null;
        this.change_state('normal');
        this.hitable = true;
    }

    change_state(state) {
        this.state = state;
        if (state == 'normal') {
            this.velocity = {
                'x': 1,
                'y': 0.5
            }
        } else {
            this.velocity = {
                'x': 2,
                'y': 1
            }
        }
    }

    change_state_animation(state_animation, direction, single=false, callback=null) {
        if (state_animation == 'move') {
            if (this.state == 'alert') {
                this.change_animation('run', direction, single, callback);
            } else {
                this.change_animation('walk', direction, single, callback);
            }
        } else if (state_animation == 'shot') {
            this.change_animation('shot1', direction, single, callback);
        } else if (state_animation == 'die') {
            this.change_animation('die1', direction, single, callback);
        } else {
            if (this.state == 'alert') {
                this.change_animation(random_element_from_list(['idle1', 'idle2']), direction, single, callback);
            } else {
                this.change_animation(random_element_from_list(['idle1', 'idle2']), direction, single, callback);
            }
        }
    }

    die() {
        this.hitable = false;
        this.controller = null;
        this.change_state_animation('die', this.want_to_move, true, function() {});
    }

    getting_hit(power) {
        if ('hp' in this) {
            this.hp -= power;
            if (this.hp <= 0) {
                this.die();
            }
        } else {
            this.die();
        }
        // tinting the color red for 250ms
        if ('tint' in this) {
            this.tint(0xFF0000);
            var hitTimeout = setTimeout(this.tint.bind(this, 0xFFFFFF), 250);
        }
    }
}

export default Person;