import * as PIXI from 'pixi.js';
import * as SAT from 'sat';

class GameObject extends PIXI.Container {
    constructor() {
        super();
        //this will be the base object for the game
        //parameters will be shared with all game objects

        this.hitable = false;
        this.helper = new PIXI.Container();  // helper container for basepoint and hitbox visuals
        this.addChild(this.helper);

        this.collision_checker = new PIXI.Graphics();
        this.collision_checker.lineStyle(1, 0xFF0000);
        this.collision_checker.drawRect()
        this.hitbox = {
            'ground': null,
            'sprite': null
        }
    }

    create_basepoint() {
        var basepoint = new PIXI.Graphics();
        basepoint.lineStyle(1, 0xFF0000);
        basepoint.drawRect(this.pivot.x, this.pivot.y, 1, 1);
        this.helper.addChild(basepoint);
    }

    create_ground_hitbox(size = 1) {
        this.hitbox.ground = new SAT.Polygon(
            new SAT.Vector(this.pivot.scope.position.x, this.pivot.scope.position.y), [
                new SAT.Vector(0, 0 - (1 * size)),
                new SAT.Vector(0 - (2 * size), 0),
                new SAT.Vector(0, (1 * size)),
                new SAT.Vector((2 * size), 0),
            ]
        );

        var ground_hitbox_helper = new PIXI.Graphics();
        ground_hitbox_helper.lineStyle(1, 0xFF0000);
        ground_hitbox_helper.moveTo(this.hitbox.ground.points[0].x, this.hitbox.ground.points[0].y);
        ground_hitbox_helper.lineTo(this.hitbox.ground.points[1].x, this.hitbox.ground.points[1].y);
        ground_hitbox_helper.lineTo(this.hitbox.ground.points[2].x, this.hitbox.ground.points[2].y);
        ground_hitbox_helper.lineTo(this.hitbox.ground.points[3].x, this.hitbox.ground.points[3].y);
        ground_hitbox_helper.lineTo(this.hitbox.ground.points[0].x, this.hitbox.ground.points[0].y);
        var ground_hitbox_helper_container = new PIXI.Container();
        ground_hitbox_helper_container.addChild(ground_hitbox_helper);
        ground_hitbox_helper_container.position.x = this.pivot.x;
        ground_hitbox_helper_container.position.y = this.pivot.y;
        this.helper.addChild(ground_hitbox_helper_container);

    }

}

export default GameObject;