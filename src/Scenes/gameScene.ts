// imports
import {SceneClass} from 'kontra';
import CatSprite from "../Sprites/catSprite.ts";
import GunSprite from "../Sprites/gunSprite.ts";

// Game scene: Main game scene
export default class GameScene extends SceneClass {

    constructor(id: string) {

        super({id: id});

    }

    onShow() {

        let gun = new GunSprite();
        this.add(gun);
        this.add(new CatSprite(100, 100, gun));

    }

    onHide() {

        console.log('hide ' + this.id);

    }

    update() {
        super.update();

    }

    render() {
        super.render();
    }

}