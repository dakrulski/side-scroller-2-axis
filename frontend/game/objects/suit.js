import * as PIXI from 'pixi.js';
import MoveableAnimation from './moveable_animation.js';

class Suit extends MoveableAnimation {
    constructor(pos_x, pos_y, anim_dict) {
        super(anim_dict);
        // set pivot point
        this.pivot.set(50,64);
        this.position.x = pos_x;
        this.position.y = pos_y;
        // create a visible point on the pivot
        this.create_basepoint();
        this.create_ground_hitbox(5);
        this.helper.visible = false;

        this.ki = false;
        this.controller = null;
        this.controller_counter = 0;
        this.controller_data = {};
        this.controller_directions = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

        this.change_animation('idle1', 's');
    }

    update() {
        if (this.controller) {
            this.controller();
        }
    }

    install_controller(controller, data) {
        this.controller_data = data;
        this.controller = controller;
    }
};

export default Suit;