import * as PIXI from 'pixi.js';
import * as SAT from 'sat';
import Viewport from './system/viewport.js';
import Textures from './system/textures.js';
import Suit from './objects/suit.js';
import { wanderer_random } from './controller/wanderer.js';
import { random_int_from_interval } from './system/functions.js';

class Game extends PIXI.Application {
    constructor() {
        super();

        this.texture = new Textures();

        //this.loader.add('suit_png', '/static/models/suit/suit.png', {'metadata': {'type': 'spritesheet'}});
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
        this.loader.add('suit', '/static/models/suit/suit.json', {'metadata': {'type': 'multi_anim', 'group_name': 'suit'}});

        this.loader.load((loader, resources) => {

            var viewport = new Viewport();
            this.viewport = viewport;
            this.stage.addChild(this.viewport);

            this.texture.create_textures(resources);

            for (let suit_cnt = 0; suit_cnt <= 80; suit_cnt++) {

                var suit_anim_dict = this.texture.anim.suit;
                //todo: the animation speeds should be added to the texture-object right after it is created
                suit_anim_dict['_animation_speeds'] = {
                    'walk': 1,
                    'idle': 0.2,
                    'idle2': 0.1
                };
                var suit = new Suit(random_int_from_interval(80,700), random_int_from_interval(80,500), suit_anim_dict);
                suit.install_controller(wanderer_random, {'min_x': 50, 'min_y': 50, 'max_x': 750, 'max_y': 550});

                this.viewport.add_object(suit);

            }

            this.ticker.add(function() {
                viewport.update_objects();
            });


        });
    }
}

export default Game;
