var game;
$( document ).ready(function() {
    game = new MainGame();
    game.startGame();
    $(document).click(function() {
        game.character.cambiarLado();
    });
});
