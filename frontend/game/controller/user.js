import Controls from '../system/controls.js';

export function user_input() {
    if (Controls.move_key_pressed['ArrowUp'] === true) {
        if (Controls.move_key_pressed['ArrowLeft'] === true) {
            this.want_to_move = 'nw';
            this.is_moving = true;
        }
        else if (Controls.move_key_pressed['ArrowRight'] === true) {
            this.want_to_move = 'ne';
            this.is_moving = true;
        } else {
            this.want_to_move = 'n';
            this.is_moving = true;
        }
    } else if (Controls.move_key_pressed['ArrowDown'] === true) {
        if (Controls.move_key_pressed['ArrowLeft'] === true) {
            this.want_to_move = 'sw';
            this.is_moving = true;
        }
        else if (Controls.move_key_pressed['ArrowRight'] === true) {
            this.want_to_move = 'se';
            this.is_moving = true;
        } else {
            this.want_to_move = 's';
            this.is_moving = true;
        }
    } else {
        if (Controls.move_key_pressed['ArrowLeft'] === true) {
            this.want_to_move = 'w';
            this.is_moving = true;
        } else if (Controls.move_key_pressed['ArrowRight'] === true) {
            this.want_to_move = 'e';
            this.is_moving = true;
        }
    }
    if (this.is_moving) {
        this.change_state_animation('move', this.want_to_move);
        this.move(this.want_to_move);
    } else {
        if (!(this.want_to_move == null)) {
            this.change_state_animation('stand', this.want_to_move);
            this.want_to_move = null;
        }
    }
    this.is_moving = false;
};