/**
 *
 * Game Utils
 */

function getRandomNumber(range) {
    return Math.floor(Math.random() * range);
}

function collision(div1, div2) {
    const a = div1.getBoundingClientRect();
    const b = div2.getBoundingClientRect();
    return !(
        a.bottom < b.top ||
        a.top > b.bottom ||
        a.right < b.left ||
        a.left > b.right
    );
}

function startGame() {
    game = new Game();
    game.start();
}
