import * as PIXI from 'pixi.js';
import TestGraphic from './objects/test.js';
import Viewport from './system/viewport.js';


class Game extends PIXI.Application {
    constructor() {
        super();
        let testor = new TestGraphic(this.view.width/2, this.view.height/2, 100, 100, 5, 0xF00d0F);
        this.stage.addChild(testor);
        this.ticker.add(function() {
            testor.rotation += 0.01;
        });

        this.viewport = new Viewport();
        this.stage.addChild(this.viewport);
    }
}

export default Game;
