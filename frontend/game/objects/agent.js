import * as PIXI from 'pixi.js';
import Person from './person.js';

class Agent extends Person {
    constructor(pos_x, pos_y, anim_dict) {
        super(anim_dict);
        // set pivot point
        this.pivot.set(50,64);
        this.position.x = pos_x;
        this.position.y = pos_y;
        // create a visible point on the pivot
        this.create_basepoint();
        this.create_ground_hitbox(5);
        this.create_sprite_hitbox([40,25, 60,25, 60,70, 40,70, 40,25]);
        this.helper.visible = false;

        this.ki = false;
        this.controller = null;
        this.controller_counter = 0;
        this.controller_data = {};
        this.controller_directions = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

        this.change_animation('idle1', 's');
    }

    get_direction(x, y) {
        let angle = Math.atan2(y - this.pivot.scope.position.y, x - this.pivot.scope.position.x);
        // my math skills are a little rusty... this needs to be cleaned up some day
        angle = (angle + Math.PI + (((12 * Math.PI) + Math.PI) / 8)) / (Math.PI / 4);
        let eighth = Math.floor(angle) % 8;
        switch (eighth) {
            case 0: return 'n';
            case 1: return 'ne';
            case 2: return 'e';
            case 3: return 'se';
            case 4: return 's';
            case 5: return 'sw';
            case 6: return 'w';
            case 7: return 'nw';
            default: return 's';
        }
    }

    shot(x, y) {
        let direction = this.get_direction(x, y);
        this.change_state_animation('shot', direction, true);
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

export default Agent;