import * as PIXI from 'pixi.js';


class ObjectContainer extends PIXI.Container {
    constructor() {
        super();
    }

    z_sort() {
        this.children.sort( function compare(a, b) {
            if (a.pivot.scope.position.y < b.pivot.scope.position.y) {
                return -1;
            }
            if (a.pivot.scope.position.y > b.pivot.scope.position.y) {
                return 1;
            }
            return 0;
        });
    }

    update() {
        for (let update_child of this.children) {
            if (update_child['update']) {
                update_child.update();
            }
        }
    }
}

export default ObjectContainer;
