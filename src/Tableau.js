class Tableau extends Phaser.Scene {
    preload() {
        this.load.image('square','asset/carre.png');
        this.load.image('circle','asset/cercle.png');
    }
    create() {
        this.square = this.add.image(0,0,'square').setOrigin(0,0);
        this.circle = this.add.image(0,0,'circle').setOrigin(0,50);
    }
    update() {
    }
    }