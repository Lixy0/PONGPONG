let gameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    backgroundColor: 'rgba(0,0,0,0.87)',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {

        }
    },
    scene: new Tableau()
};

let game = new Phaser.Game(gameConfig);
