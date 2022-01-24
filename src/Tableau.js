class Tableau extends Phaser.Scene {

    /**
     * Précharge les assets
     */
    preload() {
        this.load.image('carre','asset/carre.png');
        this.load.image('balle','asset/cercle.png');
        //preload de sons
        this.load.audio('paddleS', 'sound/pong-paddle.mp3')
        this.load.audio('wallS', 'sound/pong-wall.mp3')
        this.load.audio('scoreS', 'sound/pong-score.mp3')
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
        this.balle.body.setBounce(1.5,1.5);
        this.balle.setVelocityX(Phaser.Math.Between(200,-200));
        this.balle.setVelocityY(Phaser.Math.Between(0,0));
        this.balle.body.setMaxVelocityX(500,500);
        this.balle.body.setMaxVelocityY(100,100);

        //gauche(physique, taille)
        this.gauche = this.physics.add.sprite(40,210,'carre').setOrigin(0,0);
        this.gauche.setDisplaySize(15,100);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);

        //droite(physique, taille)
        this.droite = this.physics.add.sprite(950,210,'carre').setOrigin(0,0);
        this.droite.setDisplaySize(15,100);
        this.droite.body.setAllowGravity(false);
        this.droite.setImmovable(true);

        //séparation centre comme dans PONG
        this.separation4 = this.add.sprite(500,10,'carre').setOrigin(0,0);
        this.separation4.setDisplaySize(5,60);
        this.separation3 = this.add.sprite(500,80,'carre').setOrigin(0,0);
        this.separation3.setDisplaySize(5,60);
        this.separation2 = this.add.sprite(500,150,'carre').setOrigin(0,0);
        this.separation2.setDisplaySize(5,60);

        this.separation1 = this.add.sprite(500,220,'carre').setOrigin(0,0);
        this.separation1.setDisplaySize(5,60);

        this.separation5 = this.add.sprite(500,290,'carre').setOrigin(0,0);
        this.separation5.setDisplaySize(5,60);
        this.separation6 = this.add.sprite(500,360,'carre').setOrigin(0,0);
        this.separation6.setDisplaySize(5,60);
        this.separation7 = this.add.sprite(500,430,'carre').setOrigin(0,0);
        this.separation7.setDisplaySize(5,60);

        //colliders
        this.physics.add.collider(this.balle,this.haut);
        this.physics.add.collider(this.balle,this.bas);

        let me = this;
        this.physics.add.collider(this.balle, this.droite, function() {
            console.log ("touche droit")
            me.rebond(me.droite)
        });
        this.physics.add.collider(this.balle, this.gauche, function() {
            console.log ("touche gauche")
            me.rebond(me.gauche)
        });

        //vitesse initial des pads
        this.gaucheSpeed = 0
        this.droiteSpeed = 0

        /**
         * @type {number}
         //scores initial des joueurs
         this.scoreGauche=0
         this.scoreDroite=0
         */


        //création de la fonction clavier
        this.initKeyboard();

        this.balleAucentre();

        this.joueurGauche = new Joueur('J1','joueurGauche')
        this.joueurDroite = new Joueur('J2','joueurDroite')
    }

    rebond(players){

        let me=this;

        console.log(players.y)
        console.log(me.balle.y)
        console.log((me.balle.y)-(players.y))

        let hauteurPlayers = players.displayHeight;

        let positionRelativePlayers =(this.balle.y-players.y);

        positionRelativePlayers = (positionRelativePlayers/hauteurPlayers);

        positionRelativePlayers = (positionRelativePlayers*2-1);
        console.log(positionRelativePlayers);

        this.balle.setVelocityY( this.balle.body.velocity.y + positionRelativePlayers * hauteurPlayers)

    }

/*
    win(player){
        //points ++
        this.score.player+= 1;
        this.scoreText.setText('' + this.score.player)
        //reset start up point etc...
        this.balle.x=this.largeur/2
        this.balle.y=this.hauteur/2
        this.balle.setVelocityX(Phaser.Math.Between(200,-200));
        this.balle.setVelocityY(Phaser.Math.Between(0,0));
        this.balle.body.setMaxVelocityX(500,500);
        this.balle.body.setMaxVelocityY(100,100);
    }
 */


    balleAucentre(){
        this.balle.x = this.largeur/2
        this.balle.y = this.hauteur/2
        this.speedX = 0

        this.balle.setVelocityX(Math.random()>0.5?-300:300)
        this.balle.setVelocityY(0)
    }

    /**
     *
     * @param {Joueur} joueur
     */
    win(joueur){
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score ++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.balleAucentre();
    }


    update() {
        //pour eviter bug de collisions avec la balles et les murs
        if (this.balle.x > this.largeur) {
            this.win(this.joueurGauche);
        }
        if (this.balle.x < 0) {
            this.win(this.joueurDroite);
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
        if (this.gauche.y < 20) {
            this.gaucheSpeed = 0
            this.gauche.y = 21
        }
        if (this.gauche.y > 390) {
            this.gaucheSpeed = 0
            this.gauche.y = 389
        }

        //joueur DROITE (verif collisions mur haut/bas)
        if (this.droite.y < 20) {
            this.droiteSpeed = 0
            this.droite.y = 21
        }
        if (this.droite.y > 390) {
            this.droiteSpeed = 0
            this.droite.y = 389
        }

        this.gauche.y += this.gaucheSpeed
        this.droite.y += this.droiteSpeed

        /*
        //verif si la balle touche à droite ou à gauhce -> update le score
        if (this.balle.x > 990) {
            this.resetDroite()
        }
        if (this.balle.x < -5) {
            this.resetGauche()
        }
         */
    }

    initKeyboard(){
        let me = this
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.gaucheSpeed = -5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.gaucheSpeed = 5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.droiteSpeed = -5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.droiteSpeed = 5
                    break;
            }
        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.gaucheSpeed = 0
                    break
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.gaucheSpeed = 0
                    break
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.droiteSpeed = 0
                    break
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.droiteSpeed = 0
                    break;
            }
        });
    }
}
