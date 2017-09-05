import * as PIXI from 'pixi.js';

class Textures {
    constructor(loader, game_start) {

        this.basic = {};
        this.floor = {};
        this.spritesheet = {};
        this.multi_spritesheet = {};
        this.anim = {};

    }

    create_animation(resource) {
        var anim_data = resource.data._meta;
        this.anim[anim_data.name] = {};
        for (let anim_name in resource.data) {
            if (anim_name != '_meta') {
                this.anim[anim_data.name][anim_name] = {};
                for (let dir in resource.data[anim_name]) {
                    this.anim[anim_data.name][anim_name][dir] = [];
                    for (let frame in resource.data[anim_name][dir]) {
                        this.anim[anim_data.name][anim_name][dir].push(
                            new PIXI.Texture(
                                this.spritesheet[resource.metadata.texture_name],
                                new PIXI.Rectangle(
                                    resource.data[anim_name][dir][frame].x,
                                    resource.data[anim_name][dir][frame].y,
                                    anim_data.sprite_width,
                                    anim_data.sprite_height
                                )
                            )
                        );

                    };
                };
            };
        };
    }

    create_multi_animation(resource) {
        var anim_data = resource.data._meta;
        this.anim[anim_data.name] = {};
        for (let anim_name in resource.data) {
            if (anim_name != '_meta') {
                this.anim[anim_data.name][anim_name] = {};
                for (let dir in resource.data[anim_name]) {
                    this.anim[anim_data.name][anim_name][dir] = [];
                    for (let frame in resource.data[anim_name][dir]) {
                        this.anim[anim_data.name][anim_name][dir].push(
                            new PIXI.Texture(
                                this.multi_spritesheet[resource.metadata.group_name][anim_name],
                                new PIXI.Rectangle(
                                    resource.data[anim_name][dir][frame].x,
                                    resource.data[anim_name][dir][frame].y,
                                    anim_data.sprite_width,
                                    anim_data.sprite_height
                                )
                            )
                        );

                    };
                };
            };
        };
    }

    create_textures(resources) {
        for (let rname in resources) {
            switch (resources[rname].extension) {
                case "png":
                    console.log('PNG');
                    console.log(resources[rname]);
                    // descision based on metadata.type
                    if (resources[rname].metadata.type == 'multi_spritesheet') {
                        // check if group exist, if not create it
                        if (this.multi_spritesheet[resources[rname].metadata.group_name]) {
                            this.multi_spritesheet[resources[rname].metadata.group_name][resources[rname].metadata.action_name] = resources[rname].texture;
                        } else {
                            this.multi_spritesheet[resources[rname].metadata.group_name] = {};
                            this.multi_spritesheet[resources[rname].metadata.group_name][resources[rname].metadata.action_name] = resources[rname].texture;
                        }
                    } else {
                        this[resources[rname].metadata.type][rname] = resources[rname].texture;
                    }
                    break;
                case "json":
                    console.log('JSON');
                    if (resources[rname].metadata.type == 'multi_anim') {
                        console.log('Loading Multi Animation Object');
                        console.log(resources[rname]);
                        this.create_multi_animation(resources[rname]);
                    };
                    if (resources[rname].metadata.type == 'anim') {
                        console.log('Loading Animation');
                        console.log(resources[rname]);
                        this.create_animation(resources[rname]);
                    };
                    break;
            }
        }
    };
};

export default Textures;