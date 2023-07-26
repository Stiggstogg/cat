// imports
import {SceneClass, load} from 'kontra';
import {sceneManager} from '../main.ts';
import catImg from '../assets/images/Cat.png';
import gunImg from '../assets/images/gun.png';

// Loading Scene: Loads all assets
export default class LoadingScene extends SceneClass {

    constructor(id: string) {

        super({id: id});

    }

    onShow() {

        // load assets
        load(catImg, gunImg).then( function(): void {

            sceneManager.start('game');         // start the next scene as soon as the assets are loaded

        });

    }

}