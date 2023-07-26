// imports
import './style.css'

// imports: kontra and loop
import {GameLoop, init, initGamepad, initKeys} from 'kontra';

// imports: images

// import sprite instances
import SceneManager from "./Scenes/sceneManager.ts";
import LoadingScene from "./Scenes/loadingScene.ts";
import GameScene from "./Scenes/gameScene.ts";

// initialize kontra
init();
initKeys();
initGamepad();

// create scenes
const loadingScene = new LoadingScene('loading');
const gameScene = new GameScene('game');

// create scene manager
export let sceneManager = new SceneManager([loadingScene, gameScene]);

// game loop
let loop = GameLoop({

    // update
    update: function(): void {

        sceneManager.currentScene.update();

    },

    // render
    render: function(): void {

        sceneManager.currentScene.render();

    }

});

// start loop
loop.start();
