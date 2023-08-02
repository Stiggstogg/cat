import {
    SpriteClass,
    getCanvas,
    imageAssets,
    SpriteSheet,
    Vector
} from 'kontra';
import {gameOptions} from "../helper/gameOptions.ts";
import catImg from '../assets/images/Cat.png';

export default class CatSprite extends SpriteClass {

    private gunEquipped: boolean

    constructor(x: number, y: number) {

        // create animations
        let spriteSheet = SpriteSheet({
            image: imageAssets[catImg],
            frameWidth: 16,
            frameHeight: 16,
            animations: {
                idle: {
                    frames: '0',
                    loop: false
                },
                idleGun: {
                    frames: '1',
                    loop: false
                },
                walk: {
                    frames: '2..3',
                    frameRate: 10
                },
                walkGun: {
                    frames: '4..5',
                    frameRate: 10
                }
            }
        });

        super({x: x, y: y, anchor: {x: 0.5, y: 0.5}, animations: spriteSheet.animations});

        // clamp position to canvas
        this.position.clamp(this.width / 2 , this.height / 2, getCanvas().width - this.width / 2, getCanvas().height - this.height / 2);

        // add gun
        this.gunEquipped = false;       // gun is not equipped at the beginning

    }

    update() {

        super.update();

        // set the animation to 'idle' if the cat is not moving or 'walk' if it is moving
        if (this.dx == 0 && this.dy == 0) {

            if (this.gunEquipped) {
                this.playAnimation('idleGun');
            }
            else {
                this.playAnimation('idle');
            }

        }
        else {

            if (this.gunEquipped) {
                this.playAnimation('walkGun');
            }
            else {
                this.playAnimation('walk');
            }

        }

    }

    draw() {
        super.draw();
    }

    move(direction: Vector) {

        // set the acceleration
        this.dx = direction.x * gameOptions.catSpeed;
        this.dy = direction.y * gameOptions.catSpeed;


    }

    toggleGun() {

        this.gunEquipped = !this.gunEquipped;   // toggle gun

    }

}