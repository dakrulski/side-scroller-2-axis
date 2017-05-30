import * as PIXI from 'pixi.js';


class ObjectContainer extends PIXI.Container {
    constructor() {
        super();
    }
    z_sort() {
        this.children.sort( function compare(a, b) {
            if (a.pivot.position.y < b.pivot.position.y) {
                return -1;
            }
            if (a.pivot.position.y > b.pivot.position.y) {
                return 1;
            }
            // equal
            return 0;
        });
    }
}

export default ObjectContainer;
