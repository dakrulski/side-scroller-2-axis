import Game from './game/game.js';

document.addEventListener('DOMContentLoaded', function() {
    var game = new Game();
    document.body.appendChild(game.view);

    console.log('Game:');
    console.log(game);
});
