import * as PIXI from 'pixi.js';
import ObjectContainer from './object-container.js';


class Viewport extends PIXI.Container {
    constructor() {
        super();
        //this will be the background and the first layer of rendering
        //this.background = new PIXI.extras.TilingSprite();

        //this will get all objects for z-sorting
        //second layer of rendering
        this.objects = new ObjectContainer();
        this.addChild(this.objects);

        console.log('VIEWPORT');
        console.log(this);
    }
}

export default Viewport;
