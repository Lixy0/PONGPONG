class Tableau extends Phaser.Scene {

    /**
     * Précharge les assets
     */
    preload() {
        this.load.image('carre', 'asset/carre.png');
        this.load.image('carre2', 'asset/carre2.png');
        this.load.image('carreB', 'asset/carreB.png');
        this.load.image('carreR', 'asset/carreR.png');
        this.load.image('balle', 'asset/cercle.png');

        this.load.image('terrain', 'asset/terrain.png');

        //preload de sons
        this.load.audio('mainTheme', 'sound/wiiSportsTheme.mp3')
    }

    /**
     * Affiche les assets/placement/size
     */
    create() {
        this.hauteur = 500
        this.largeur = 1000

        this.add.image(0, 0, 'terrain').setOrigin(0, 0);

        //haut(physique, taille)
        this.haut = this.physics.add.sprite(0, 0, 'carre').setOrigin(0, 0);
        this.haut.setDisplaySize(this.largeur, 20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);
        //bas(physique, taille)
        this.bas = this.physics.add.sprite(0, this.hauteur - 20, 'carre2').setOrigin(0, 0);
        this.bas.setDisplaySize(this.largeur, 20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);

        //affichage balle
        this.balle = this.physics.add.sprite(this.largeur / 2, this.hauteur / 2, 'balle').setOrigin(0, 0);
        this.balle.setDisplaySize(20, 20);
        //actions de rebondisement/speed
        this.balle.body.setBounce(1.5, 1.5);
        this.balle.setVelocityX(Phaser.Math.Between(200, -200));
        this.balle.setVelocityY(Phaser.Math.Between(0, 0));
        this.balle.body.setMaxVelocityX(500, 500);
        this.balle.body.setMaxVelocityY(100, 100);

        //Raquette gauche(physique, taille)
        this.gauche = this.physics.add.sprite(40, 210, 'carreR').setOrigin(0, 0);
        this.gauche.setDisplaySize(15, 100);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);

        //Raquette droite(physique, taille)
        this.droite = this.physics.add.sprite(950, 210, 'carreB').setOrigin(0, 0);
        this.droite.setDisplaySize(15, 100);
        this.droite.body.setAllowGravity(false);
        this.droite.setImmovable(true);


        //colliders balle/bordure
        this.physics.add.collider(this.balle, this.haut);
        this.physics.add.collider(this.balle, this.bas);

        //colliders balle/raquettes
        let me = this;
        this.physics.add.collider(this.balle, this.droite, function () {
            me.rebond(me.droite)
        });
        this.physics.add.collider(this.balle, this.gauche, function () {
            me.rebond(me.gauche)
        });


        //vitesse initial des pads
        this.gaucheSpeed = 0
        this.droiteSpeed = 0


        //création de la fonction clavier
        this.initKeyboard();
        //creation de balle au centre (reset positions de la balle si point gagné)
        this.balleAucentre();

        //visuel clavier
        this.creerClavier();


        //définition des scores (noms et à qui chaque nom correspond)
        this.joueurGauche = new Joueur('Matt', 'joueurGauche')
        this.joueurDroite = new Joueur('Patt', 'joueurDroite')

        //musique de fond loop
        this.backSound = this.sound.add('mainTheme');
        this.backSound.play()
        this.backSound.volume = 0.2;
        this.backSound.loop = true;
    }


    //rebons en fonction de ou touche la balle sur la raquette (?)
    rebond(players) {

        let me = this;

        console.log(players.y)
        console.log(me.balle.y)
        console.log((me.balle.y) - (players.y))

        let hauteurPlayers = players.displayHeight;

        let positionRelativePlayers = (this.balle.y - players.y);

        positionRelativePlayers = (positionRelativePlayers / hauteurPlayers);

        positionRelativePlayers = (positionRelativePlayers * 2 - 1);
        console.log(positionRelativePlayers);

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativePlayers * hauteurPlayers)

    }

    //fonction reset de la balle
    balleAucentre() {
        this.balle.x = this.largeur / 2
        this.balle.y = this.hauteur / 2
        this.speedX = 0

        this.balle.setVelocityX(Math.random() > 0.5 ? -300 : 300)
        this.balle.setVelocityY(0)
    }


    /**
     * parametre du win avec Jouer.js
     * @param {Joueur} joueur
     */
    win(joueur) {
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score++;
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


        //touches clavier
        //BONUS : show keyboard?

    }

    creerClavier() {
        //pression des touches
        let espacement = (this.game.config.width - 2) / this.lettres.length; // -2 c'est pour avoir une petite marge d'un pixel
        let x = 1;
        for (let lettre of this.lettres) {
            let objetGraphique = this.add.text(x, 1, lettre, {
                color: "#FFFFFF", //blanc
                align: "center",
                backgroundColor: "#345EE3", //bleu
                fixedWidth: espacement - 1  // -1 c'est pour avoir une petite marge d'un pixel entre les lettres
            });
            x += espacement;
            objetGraphique.name = lettre;
        }
    }
    initKeyboard() {
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
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
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