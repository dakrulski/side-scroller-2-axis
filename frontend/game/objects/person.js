import { random_element_from_list } from '../system/functions.js';
import MoveableAnimation from './moveable_animation.js';

class Person extends MoveableAnimation {
    constructor(anim_dict) {
        super(anim_dict);
        this.state = null;
        this.change_state('normal');
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

    change_state_animation(state_animation, direction) {
        if (state_animation == 'move') {
            if (this.state == 'alert') {
                this.change_animation('run', direction);
            } else {
                this.change_animation('walk', direction);
            }
        } else {
            if (this.state == 'alert') {
                this.change_animation(random_element_from_list(['idle1', 'idle2']), direction);
            } else {
                this.change_animation(random_element_from_list(['idle1', 'idle2']), direction);
            }
        }
    }
}

export default Person;