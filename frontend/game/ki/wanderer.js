import { random_int_from_interval, random_element_from_list, get_position_in_direction, get_opposite_direction } from '../system/functions.js';

export function wanderer_random() {

    if (this.controller_counter == 0) {
        // decide to idle or walk
        let decision = random_element_from_list(['idle1', 'idle2', 'walk']);
        if (decision == 'walk') {
            // set new intent to move in a random direction
            this.want_to_move = random_element_from_list(this.controller_directions);
            this.is_moving = true;
            this.change_animation('walk', this.want_to_move);
            // set how long you want to move
            this.controller_counter = random_int_from_interval(10,200);
        } else {
            // idle or idle2
            this.is_moving = false;
            // use this.want_to_move for direction from last time walking
            if (!this.want_to_move) this.want_to_move = random_element_from_list(this.controller_directions);
            this.change_animation(decision, this.want_to_move);
            // set how long you want to idle
            this.controller_counter = random_int_from_interval(10,200);
        }
    } else {
        if (this.is_moving) {
            // todo: build in pivot offset
            var next_pos = get_position_in_direction(this.pivot.scope.position, this.want_to_move, this.velocity);
            if (
                (this.controller_data.min_x < next_pos.x) &&
                (next_pos.x < this.controller_data.max_x) &&
                (this.controller_data.min_y < next_pos.y) &&
                (next_pos.y < this.controller_data.max_y)
            ) {
                // normal walking
                this.controller_counter -= 1;
                this.move(this.want_to_move);
            } else {
                // if you hit a wall while walking, back off
                this.controller_counter = random_int_from_interval(10,200);
                this.want_to_move = get_opposite_direction(this.want_to_move);
                this.change_animation('walk', this.want_to_move);
                // checks if npc is outside the box. move him back if true
                if (this.pivot.scope.position.x < this.controller_data.min_x) {
                    this.move('e');
                }
                if (this.pivot.scope.position.x > this.controller_data.max_x) {
                    this.move('w');
                }
                if (this.pivot.scope.position.y < this.controller_data.min_y) {
                    this.move('s');
                }
                if (this.pivot.scope.position.y > this.controller_data.max_y) {
                    this.move('n');
                }
            }
        } else {
            this.controller_counter -= 1;
        }
    }
};