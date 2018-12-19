import * as PIXI from 'pixi.js';
import * as SAT from 'sat';
import Viewport from './system/viewport.js';
import Textures from './system/textures.js';
import Suit from './objects/suit.js';
import Agent from './objects/agent.js';
import Player from './objects/player.js';
import { wanderer_random } from './controller/wanderer.js';
import { user_input } from './controller/user.js';
import { random_int_from_interval } from './system/functions.js';

import Controls from './system/controls.js';

class Game extends PIXI.Application {
    constructor() {
        super();

        Controls.set_mouse(this.renderer.plugins.interaction.mouse.global);
        console.log('CONTROLS');
        console.log(Controls);

        this.texture = new Textures();

        // SUIT
        this.loader.add('suit_idle1', '/static/models/suit/idle1.png', {
            'metadata': {
                'type': 'multi_spritesheet',
                'group_name': 'suit',
                'action_name': 'idle1'
            }
        });
        this.loader.add('suit_idle2', '/static/models/suit/idle2.png', {
            'metadata': {
                'type': 'multi_spritesheet',
                'group_name': 'suit',
                'action_name': 'idle2'
            }
        });
        this.loader.add('suit_walk', '/static/models/suit/walk.png', {
            'metadata': {
                'type': 'multi_spritesheet',
                'group_name': 'suit',
                'action_name': 'walk'
            }
        });
        this.loader.add('suit_run', '/static/models/suit/run.png', {
            'metadata': {
                'type': 'multi_spritesheet',
                'group_name': 'suit',
                'action_name': 'run'
            }
        });
        this.loader.add('suit_die1', '/static/models/suit/die1.png', {
            'metadata': {
                'type': 'multi_spritesheet',
                'group_name': 'suit',
                'action_name': 'die1'
            }
        });
        this.loader.add('suit', '/static/models/suit/suit.json', {'metadata': {'type': 'multi_anim', 'group_name': 'suit'}});

        // AGENT
        this.loader.add('agent_idle1', '/static/models/agent/idle1.png', {
            'metadata': {
                'type': 'multi_spritesheet',
                'group_name': 'agent',
                'action_name': 'idle1'
            }
        });

        this.loader.add('agent_idle2', '/static/models/agent/idle2.png', {
            'metadata': {
                'type': 'multi_spritesheet',
                'group_name': 'agent',
                'action_name': 'idle2'
            }
        });

        this.loader.add('agent_walk', '/static/models/agent/walk.png', {
            'metadata': {
                'type': 'multi_spritesheet',
                'group_name': 'agent',
                'action_name': 'walk'
            }
        });

        this.loader.add('agent_run', '/static/models/agent/run.png', {
            'metadata': {
                'type': 'multi_spritesheet',
                'group_name': 'agent',
                'action_name': 'run'
            }
        });

        this.loader.add('agent_shot1', '/static/models/agent/shot1.png', {
            'metadata': {
                'type': 'multi_spritesheet',
                'group_name': 'agent',
                'action_name': 'shot1'
            }
        });

        this.loader.add('agent_die1', '/static/models/agent/die1.png', {
            'metadata': {
                'type': 'multi_spritesheet',
                'group_name': 'agent',
                'action_name': 'die1'
            }
        });

        this.loader.add('agent', '/static/models/agent/agent.json', {'metadata': {'type': 'multi_anim', 'group_name': 'agent'}});


        this.loader.load((loader, resources) => {

            var viewport = new Viewport();
            this.viewport = viewport;
            this.stage.addChild(this.viewport);

            this.texture.create_textures(resources);

            for (let suit_cnt = 0; suit_cnt <= 40; suit_cnt++) {

                var suit_anim_dict = this.texture.anim.suit;
                //todo: the animation speeds should be added to the texture-object right after it is created
                suit_anim_dict['_animation_speeds'] = {
                    'run': 1.5,
                    'walk': 1,
                    'idle': 0.2,
                    'idle2': 0.1
                };
                var suit = new Suit(random_int_from_interval(80,700), random_int_from_interval(80,500), suit_anim_dict);
                suit.install_controller(wanderer_random, {'min_x': 50, 'min_y': 50, 'max_x': 750, 'max_y': 550});

                this.viewport.add_object(suit);
            }
            
            for (let agent_cnt = 0; agent_cnt <= 10; agent_cnt++) {

                var agent_anim_dict = this.texture.anim.agent;
                agent_anim_dict['_animation_speeds'] = {
                    'run': 1.5,
                    'walk': 1,
                    'idle': 0.2,
                    'idle2': 0.1,
                    'shot1': 0.3
                };
                var agent = new Agent(random_int_from_interval(80,700), random_int_from_interval(80,500), agent_anim_dict);
                agent.install_controller(wanderer_random, {'min_x': 50, 'min_y': 50, 'max_x': 750, 'max_y': 550});

                this.viewport.add_object(agent);
            }
            var player_anim_dict = this.texture.anim.agent;
            /*player_anim_dict['_animation_speeds'] = {
                'run': 1.5,
                'walk': 1,
                'idle': 0.2,
                'idle2': 0.1
            };*/
            var player = new Player(50,50, agent_anim_dict);
            player.install_controller(user_input);
            this.viewport.add_player(player);

            //this.renderer.plugins.interaction.on('mousedown', function () {player.player_shot()});

            console.log('PLAYER');
            console.log(player);

            this.ticker.add(function() {
                viewport.update_objects();
            });


        });
    }
}

export default Game;
