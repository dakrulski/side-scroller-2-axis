import * as PIXI from 'pixi.js';
import Agent from './agent.js';
import Controls from '../system/controls.js';

class Player extends Agent {
    constructor(pos_x, pos_y, anim_dict) {
        super(pos_x, pos_y, anim_dict);
        this.change_state('alert');
        this.change_state_animation('stand', 's');
    }

    get_mouse_direction() {
        return this.get_direction(Controls.mouse.x, Controls.mouse.y);
    }

    /*
    player_shot() {
        this.shot(Controls.mouse.x, Controls.mouse.y);
    }
    */

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

export default Player;