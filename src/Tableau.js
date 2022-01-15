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

        //affichage du score initial
        this.scoreText = this.add.text(110, 50, 'J1 : 0', { fontSize: '32px', fill: '#ffffff' });
        this.scoreText2 = this.add.text(710, 50, 'J2 : 0', { fontSize: '32px', fill: '#ffffff' });


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

        //création de la fonction clavier
        this.initKeyboard();

        //vitesse initial des pads
        this.gaucheSpeed = 0
        this.droiteSpeed = 0

        //scores initial des joueurs
        this.scoreGauche=0
        this.scoreDroite=0

    }

    update() {

        //pour eviter beug de collisions avec la balles et les murs
        if (this.balle.x > this.largeur) {
            this.balle.x = 0
        }
        if (this.balle.y < 0) {
            this.balle.y = 0
        }
        if (this.balle.y > this.hauteur) {
            this.balle.y = 0
        }
        if (this.gauche.y < 0) {
            this.gauche.y = 0
        }
        if (this.gauche.y > this.hauteur) {
            this.gauche.y = 0
        }
        if (this.droite.y < 0) {
            this.droite.y = 0
        }
        if (this.droite.y > this.hauteur) {
            this.droite.y = 0
        }

        //joueur GAUCHE (verif collisions mur haut/bas)
        if(this.gauche.y<20){
            this.gaucheSpeed=0
            this.gauche.y=21
        }
        if(this.gauche.y>405){
            this.gaucheSpeed=0
            this.gauche.y=404
        }

        //joueur DROITE (verif collisions mur haut/bas)
        if(this.droite.y<20){
            this.droiteSpeed=0
            this.droite.y=21
        }
        if(this.droite.y>405){
            this.droiteSpeed=0
            this.droite.y=404
        }

        this.gauche.y += this.gaucheSpeed
        this.droite.y += this.droiteSpeed
    }

    initKeyboard(){
        let me = this
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.A:
                        me.gaucheSpeed = -10
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                        me.gaucheSpeed = 10
                    break;
                case Phaser.Input.Keyboard.KeyCodes.P:
                        me.droiteSpeed = -10
                    break;
                case Phaser.Input.Keyboard.KeyCodes.M:
                        me.droiteSpeed = 10
                    break;
            }
        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.A:
                        me.gaucheSpeed = 0
                    break
                case Phaser.Input.Keyboard.KeyCodes.Q:
                        me.gaucheSpeed = 0
                    break
                case Phaser.Input.Keyboard.KeyCodes.P:
                        me.droiteSpeed = 0
                    break
                case Phaser.Input.Keyboard.KeyCodes.M:
                        me.droiteSpeed = 0
                    break;
            }
        });
    }
    }
