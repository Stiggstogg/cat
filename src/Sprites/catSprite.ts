import {
    SpriteClass,
    getCanvas,
    keyPressed,
    gamepadPressed,
    gamepadAxis,
    SpriteSheet,
    imageAssets,
    onInput
} from 'kontra';
import {gameOptions} from "../helper/gameOptions.ts";
import catImg from '../assets/images/Cat.png';
import GunSprite from "./gunSprite.ts";

export default class CatSprite extends SpriteClass {

    private gun: GunSprite
    private gunEquipped: boolean

    constructor(x: number, y: number, gun: GunSprite) {

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
        this.gun = gun;                 // add gun
        this.gunEquipped = false;       // gun is not equipped at the beginning
        onInput(['enter', 'east'], () => this.toggleGun());     // input to equip or unequip the gun

    }

    update() {

        this.movement();    // set the movement

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

        // update gun position
        this.updateGunPosition();

    }

    draw() {
        super.draw();
    }

    movement(this: CatSprite) {

        // left, right, up and down movement with keyboard and controler (dpad and left stick)
        if ((keyPressed('arrowleft') || gamepadPressed('dpadleft') || gamepadAxis('leftstickx', 0) < -0.4) &&
            (!keyPressed('arrowright') && !gamepadPressed('dpadright') && gamepadAxis('leftstickx', 0) < 0.4)) {
            this.dx = -gameOptions.catSpeed;
        }
        else if ((keyPressed('arrowright') || gamepadPressed('dpadright') || gamepadAxis('leftstickx', 0) > 0.4) &&
            (!keyPressed('arrowleft') && !gamepadPressed('dpadleft') && gamepadAxis('leftstickx', 0) > -0.4)) {
            this.dx = gameOptions.catSpeed;
        }
        else {
            this.dx = 0;
        }

        if ((keyPressed('arrowup') || gamepadPressed('dpadup') || gamepadAxis('leftsticky', 0) < -0.4) &&
            (!keyPressed('arrowdown') && !gamepadPressed('dpaddown') && gamepadAxis('leftsticky', 0) < 0.4)) {
            this.dy = -gameOptions.catSpeed;
        }
        else if ((keyPressed('arrowdown') || gamepadPressed('dpaddown') || gamepadAxis('leftsticky', 0) > 0.4) &&
            (!keyPressed('arrowup') && !gamepadPressed('dpadup') && gamepadAxis('leftsticky', 0) > -0.4)) {
            this.dy = gameOptions.catSpeed;
        }
        else {
            this.dy = 0;
        }

    }

    updateGunPosition() {

        this.gun.x = this.x + this.width / 2;
        this.gun.y = this.y + this.height / 2;

    }

    toggleGun() {

        this.gunEquipped = !this.gunEquipped;   // toggle gun

        if (this.gunEquipped) {
            this.gun.show();
        }
        else {
            this.gun.hide();
        }

    }

}