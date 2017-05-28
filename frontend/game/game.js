import * as PIXI from 'pixi.js';
import TestGraphic from './objects/test.js';


class Game extends PIXI.Application {
    constructor() {
        super();
        let testor = new TestGraphic(this.view.width/2, this.view.height/2, 100, 100, 5, 0xF00d0F);
        this.stage.addChild(testor);
        this.ticker.add(function() {
            testor.rotation += 0.01;
        });
    }
}

export default Game;
