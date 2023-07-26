import {SpriteClass, keyPressed, gamepadPressed, SpriteSheet, imageAssets, Sprite} from 'kontra';
import gunImg from '../assets/images/gun.png';
import {gameOptions} from "../helper/gameOptions.ts";

export default class GunSprite extends SpriteClass {

    private equipped: boolean
    private lastShot: number
    private shots: Sprite[]

    constructor() {

        // create animations
        let spriteSheet = SpriteSheet({
            image: imageAssets[gunImg],
            frameWidth: 15,
            frameHeight: 8,
            animations: {
                idle: {
                    frames: '0',
                    loop: false
                },
                fire: {
                    frames: '0..1',
                    frameRate: 30
                }
            }
        });

        super({x: 0, y: 0, anchor: {x: 0, y: 1}, animations: spriteSheet.animations});

        this.shots = [];

        this.equipped = false;

        this.lastShot = Date.now();

    }

    update() {

        if ((keyPressed('space') || gamepadPressed('south')) && this.equipped) {
            this.playAnimation('fire');
            this.shoot();
        }
        else {
            this.playAnimation('idle');
        }

        super.update();

    }

    draw() {

        if (this.equipped) {
            super.draw();
        }

    }

    show() {
        this.equipped = true;
    }

    hide() {
        this.equipped = false;
    }

    shoot() {

        if (Date.now() - this.lastShot > (1 / gameOptions.gunFireRate * 1000)) {

            //TODO: Add shooting here

            this.lastShot = Date.now();
        }


    }

}