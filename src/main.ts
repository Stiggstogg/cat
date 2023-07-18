// imports
import './style.css'
import { init, Sprite, GameLoop } from "kontra";

console.log('Hello world!');

// initialize
let { canvas, context } = init();

let sprite: Sprite = Sprite({
    x: 100,
    y: 80,
    color: 'red',
    width: 20,
    height: 40,
    dx: 2
});

let loop: GameLoop = GameLoop({
    update: function(): void {
        sprite.update();

        if (sprite.x > canvas.width) {
            sprite.x = -sprite.width;
        }
    },
    render: function(): void {
        sprite.render();
    }
});

loop.start();
