import * as PIXI from 'pixi.js';

class TestGraphic extends PIXI.Graphics {
    constructor(pos_x, pos_y, width, height, line_width, line_color, fill_color=undefined) {
        super();
        if (typeof fill_color !== 'undefined') {
            this.beginFill(fill_color);
        }

        this.lineStyle(line_width, line_color);

        this.drawRect(0, 0, width, height);
        this.pivot.set((width / 2), (height / 2));
        this.position.set(pos_x, pos_y);
        console.log('Box:');
        console.log(this);
    }
}

export default TestGraphic;
