import * as PIXI from 'pixi.js';
import ObjectContainer from './object-container.js';


class Viewport extends PIXI.Container {
    constructor() {
        super();
        //this will be the background and the first layer of rendering
        //this.background = new PIXI.extras.TilingSprite();
        //todo: implement the tiling background

        //this will get all objects for z-sorting
        //second layer of rendering
        this.objects = new ObjectContainer();
        this.addChild(this.objects);
    }

    objects_z_sort() {
        this.objects.z_sort();
    }

    add_object(obj) {
        this.objects.addChild(obj);
        this.objects_z_sort();
    }

    add_player(player) {
        this.player = player;
        this.objects.addChild(player);
        this.objects_z_sort();
    }

    update_objects() {
        this.objects.update();
        this.objects_z_sort();
    }
}

export default Viewport;
