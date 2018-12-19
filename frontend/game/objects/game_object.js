import * as PIXI from 'pixi.js';
import * as SAT from 'sat';
import Controls from '../system/controls.js';

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
        this.collision_checker.drawRect();
        this.hitbox = {
            'ground': null,
            'sprite': null
        };

        this.interactive = true;
        this.on('pointerdown', this.shot_this);
    }

    shot_this(shot_from) {
        // FIX FOR BUG IN PIXIJS Ver4
        // can't do "shot_from instanceof PIXI.interaction.InteractionEvent" in V4
        if ('target' in shot_from) {
            if ('currentTarget' in shot_from) {
                shot_from = this.parent.parent.player;
            }
        }
        // create animation
        shot_from.shot(this.pivot.scope.position.x, this.pivot.scope.position.y);
        // now wait 150ms for the flash of the pistol
        let next_step = setTimeout(this.shot_collision.bind(this, shot_from), 150);
    }

    shot_collision(shot_from) {
        let collisions = [];
        // draw polygon line from player to this
        // this SAT.Polygon takes an origin and
        // the relative coords to the object
        // this means i have to calculate the relative coords by absolute position
        let collision_line = new SAT.Polygon(
            new SAT.Vector(shot_from.pivot.scope.position.x, shot_from.pivot.scope.position.y), [
                new SAT.Vector(0, 0),
                new SAT.Vector(this.pivot.scope.position.x - shot_from.pivot.scope.position.x, this.pivot.scope.position.y - shot_from.pivot.scope.position.y),
            ]
        );

        // this.parent.children == all objects that can be on the line
        for (let child_num in this.parent.children) {
            if ((this.parent.children[child_num] !== shot_from) && (this.parent.children[child_num].hitable == true) && (this.parent.children[child_num].hitbox.ground != null)) {
                var response = new SAT.Response();
                var collision = SAT.testPolygonPolygon(collision_line, this.parent.children[child_num].hitbox.ground, response);
                if (collision) {
                    // glue the distance at the object to get the sort right, even if 'from' is not the player
                    this.parent.children[child_num].target_distance = (Math.sqrt(Math.pow(this.pivot.scope.position.y - shot_from.pivot.scope.position.y, 2) + Math.pow(this.pivot.scope.position.x - shot_from.pivot.scope.position.x, 2)));
                    collisions.push(this.parent.children[child_num]);
                }
            }
        }

        if (collisions.length > 0) {
            //sort collisions by distance to player
            collisions.sort(function(a, b) {
                return b.target_distance - a.target_distance;
            });

            // I will use only the first, but I should implement a decreasing damage by passed targets... someday..

            if ('getting_hit' in collisions[0]) {
                if ('attack_power' in shot_from) {
                    collisions[0].getting_hit(shot_from.attack_power);
                } else {
                    collisions[0].getting_hit(0);
                }

            }
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

    create_sprite_hitbox(poly_array) {
        this.hitArea = new PIXI.Polygon(poly_array);
        var sprite_hitbox_helper = new PIXI.Graphics();
        sprite_hitbox_helper.lineStyle(1, 0xFF0000);
        sprite_hitbox_helper.drawShape(new PIXI.Polygon(poly_array));
        this.helper.addChild(sprite_hitbox_helper);
    }

}

export default GameObject;