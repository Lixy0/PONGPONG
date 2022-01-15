class Tableau extends Phaser.Scene {

    /**
     * Précharge les assets
     */
    preload() {
        this.load.image('carre','asset/carre.png');
        this.load.image('balle','asset/cercle.png');
    }

    /**
     * Affiche les assets/placement/size
     */

    create() {
        this.hauteur=500
        this.largeur=1000

        //haut (physique, taille)
        this.haut = this.physics.add.sprite(0,0,'carre').setOrigin(0,0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);
        //bas(physique, taille)
        this.bas = this.physics.add.sprite(0,this.hauteur-20,'carre').setOrigin(0,0);
        this.bas.setDisplaySize(this.largeur,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);

        //affichage ball
        this.balle = this.physics.add.sprite(this.largeur/2,this.hauteur/2,'balle').setOrigin(0,0);
        this.balle.setDisplaySize(20,20);
        //actions de rebondisement/speed
        this.balle.body.setBounce(1.1,1.1);
        this.balle.setVelocityX(Phaser.Math.Between(200,-200));
        this.balle.body.setMaxVelocity(500,500)


        //gauche(physique, taille)
        this.gauche = this.physics.add.sprite(40,210,'carre').setOrigin(0,0);
        this.gauche.setDisplaySize(15,75);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);

        //droite(physique, taille)
        this.droite = this.physics.add.sprite(950,210,'carre').setOrigin(0,0);
        this.droite.setDisplaySize(15,75);
        this.droite.body.setAllowGravity(false);
        this.droite.setImmovable(true);

        //colliders
        this.physics.add.collider(this.balle,this.haut);
        this.physics.add.collider(this.balle,this.bas);
        this.physics.add.collider(this.balle,this.gauche);
        this.physics.add.collider(this.balle,this.droite);
        this.physics.add.collider(this.droite,this.haut);
        this.physics.add.collider(this.droite,this.bas);
        this.physics.add.collider(this.gauche,this.haut);
        this.physics.add.collider(this.gauche,this.bas);




        //création de la fonction clavier
        this.initKeyboard();
        this.speed=0;
    }

    update() {
        if (this.balle.x > this.largeur) {
            this.balle.x = 0
        }
        if (this.balle.y < 0) {
            this.balle.y = 0
        }
        if (this.balle.y > this.hauteur) {
            this.balle.y = 0
        }
    }

    initKeyboard(){
        let me=this
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.A:
                            gauche.y -= 1;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                            gauche.y += 1;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.P:
                    break;
                case Phaser.Input.Keyboard.KeyCodes.M:
                    break;
            }
        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.Z:
                case Phaser.Input.Keyboard.KeyCodes.S:
                case Phaser.Input.Keyboard.KeyCodes.UP:
                case Phaser.Input.Keyboard.KeyCodes.DOWN:
                    break;
            }
        });
    }
    }
