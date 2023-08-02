// imports
import {
    SceneClass,
    Pool,
    keyPressed,
    gamepadPressed,
    gamepadAxis,
    onInput,
    Vector,
    Sprite,
    on
} from 'kontra';
import CatSprite from "../Sprites/catSprite.ts";
import GunSprite from "../Sprites/gunSprite.ts";
import {gameOptions} from "../helper/gameOptions.ts";

// Game scene: Main game scene
export default class GameScene extends SceneClass {

    private cat!: CatSprite;
    private bullets!: Pool;
    private gun!: GunSprite;

    constructor(id: string) {

        super({id: id});

    }

    onShow() {

        // create sprites
        this.cat = new CatSprite(100, 100);
        this.gun = new GunSprite();

        // @ts-ignore (kontra creates an error here, but it works. Therefore the TS error is just ignored)
        this.bullets = Pool({create: Sprite});

        // add all game objects to the scene
        this.add([this.cat, this.gun, this.bullets]);

        // add input event handler
        onInput(['enter', 'east'], () => {
            this.cat.toggleGun();
            this.gun.toggleGun();
        });     // input to equip or unequip the gun

        // add event handler
        on('fireBullet', this.fireBullet);


    }

    onHide() {

    }

    update() {

        // inputs
        // ------------

        // cat movement
        let catDirectionVector = Vector(0, 0);

        if ((keyPressed('arrowleft') || gamepadPressed('dpadleft') || gamepadAxis('leftstickx', 0) < -0.4) &&
            (!keyPressed('arrowright') && !gamepadPressed('dpadright') && gamepadAxis('leftstickx', 0) < 0.4)) {
            catDirectionVector.x = -1;
        }
        else if ((keyPressed('arrowright') || gamepadPressed('dpadright') || gamepadAxis('leftstickx', 0) > 0.4) &&
            (!keyPressed('arrowleft') && !gamepadPressed('dpadleft') && gamepadAxis('leftstickx', 0) > -0.4)) {
            catDirectionVector.x = 1;
        }

        if ((keyPressed('arrowup') || gamepadPressed('dpadup') || gamepadAxis('leftsticky', 0) < -0.4) &&
            (!keyPressed('arrowdown') && !gamepadPressed('dpaddown') && gamepadAxis('leftsticky', 0) < 0.4)) {
            catDirectionVector.y = -1;
        }
        else if ((keyPressed('arrowdown') || gamepadPressed('dpaddown') || gamepadAxis('leftsticky', 0) > 0.4) &&
            (!keyPressed('arrowup') && !gamepadPressed('dpadup') && gamepadAxis('leftsticky', 0) > -0.4)) {
            catDirectionVector.y = 1;
        }

        this.cat.move(catDirectionVector);

        // gun
        if (keyPressed('space') || gamepadPressed('south')) {
            this.gun.fire();
        }
        else {
            this.gun.notFire();
        }

        super.update();

        this.gun.updatePosition(this.cat);      // update position of gun based on the position of the cat (needs to come after update, to ensure the cat's position is already updated)

    }

    render() {

        super.render();

        this.bullets.render();      // for some strange reason the bullets do not get rendered as part of the scene... Therefore the rendering is called here separately

    }

    fireBullet = (x: number, y: number) => {      // use arrow function to ensure the callback uses the right context (the scene)

            this.bullets.get({
                x: x,
                y: y,
                anchor: {x: 0.5, y: 0.5},
                dx: gameOptions.bulletSpeed,
                width: 2,
                height: 2,
                color: 'yellow',
                ttl: 300
            });

    }

}