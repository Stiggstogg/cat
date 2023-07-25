import {SpriteClass} from 'kontra';
import {imageAssets} from 'kontra';
import catImg from '../assets/images/Cat.png';

export default class CatSprite extends SpriteClass {

    constructor(x: number, y: number, img: string) {

        console.log(catImg);
        console.log(imageAssets);

        super({x: x, y: y, anchor: {x: 0.5, y: 0.5}, image: imageAssets[img]});

    }

    update(): void {
        super.update();
    }

    render(): void {
        super.render();
    }

}