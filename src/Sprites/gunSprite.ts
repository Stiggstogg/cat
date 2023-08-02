import {SpriteClass, SpriteSheet, imageAssets, emit} from 'kontra';
import gunImg from '../assets/images/gun.png';
import {gameOptions} from "../helper/gameOptions.ts";
import CatSprite from "./catSprite.ts";
import {zzfx} from 'ZZFX';

export default class GunSprite extends SpriteClass {

    private equipped: boolean;
    private lastBullet: number;

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

        this.equipped = false;      // gun is not equipped at the beginning

        this.lastBullet = Date.now();


    }

    update() {

        super.update();

    }

    draw() {

        if (this.equipped) {
            super.draw();
        }

    }

    updatePosition(cat: CatSprite) {

        this.x = cat.x + cat.width / 2;
        this.y = cat.y + cat.height / 2;

    }

    toggleGun() {
        this.equipped = !this.equipped;
    }

    fire() {

        if (this.equipped && Date.now() - this.lastBullet > (1 / gameOptions.gunFireRate * 1000)) {

            emit('fireBullet', this.x + this.width, this.y - this.height + 2);

            this.lastBullet = Date.now();

            zzfx(...[,1,100,,,.08,4,0,1,,,,,.5,2,.4,,,.05,.44]); // play sound

        }

        this.playAnimation('fire');

    }

    notFire() {

        this.playAnimation('idle');

    }

}