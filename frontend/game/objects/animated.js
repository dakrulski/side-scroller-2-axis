import GameObject from './game_object.js';

class AnimatedObject extends GameObject {
    constructor(animation_dict) {
        super();
        this.animations = {};
        this.animation_container = new PIXI.Container();
        this.addChild(this.animation_container);
        this.animation_speeds = animation_dict['_animation_speeds']
        for (let anim in animation_dict) {
            if (anim != '_animation_speeds') {
                this.animations[anim] = {};
                for (let dir in animation_dict[anim]) {
                    this.animations[anim][dir] = new PIXI.extras.AnimatedSprite(animation_dict[anim][dir]);
                    if (this.animation_speeds) {
                        if (this.animation_speeds[anim]) {
                            this.animations[anim][dir].animationSpeed = this.animation_speeds[anim]
                        }
                    }
                }
            }
        }
    }

    change_animation(anim, dir) {
        if (this.animation_container.children.length > 0) {
            this.animation_container.removeChild(this.animation_container.children[0]);
        }
        this.animations[anim][dir].play();
        this.animation_container.addChild(this.animations[anim][dir]);
    }
}

export default AnimatedObject;