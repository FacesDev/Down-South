EnemyBird = function (index, game, x, y) {
    this.bird = game.add.sprite(x, y, 'bird');
    this.bird.anchor.setTo(0.5, 0.5);
    this.bird.name = index.toString();
    game.physics.enable(this.bird, Phaser.Physics.ARCADE);
    this.bird.body.immovable = true;
    this.bird.body.collideWorldBounds = true;
    this.bird.body.allowGravity = false;

    this.birdTween = game.add.tween(this.bird).to({
        y: this.bird.y + 100
    }, 2000, 'Linear', true, 0, 100, true);


    //78 stars
}

var enemy1;

Game.Level1 = function (game) { };
var playerXP = 0;
var gameXPsteps = 15;
var playerLevel = 0;
var map;
var layer;
var bullets;
var stars;
var shootTime = 0;
var player;
var controls = {};
var playerSpeed = 200;
var jumpTimer = 0;
var drag;
var score = 0;
var scoreText;
var winText;




Game.Level1.prototype = {
    create: function (game) {

        // beta stars
        stars = this.add.group();
        stars.enableBody = true;
        var star0 = stars.create(350, 2400, 'diamond');
        star0.body.gravity.y = 1000;
        star0.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star2 = stars.create(450, 2400, 'diamond');
        star2.body.gravity.y = 1000;
        star2.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star3 = stars.create(470, 2250, 'diamond');
        star3.body.allowGravity = false;
        var star4 = stars.create(100, 2100, 'diamond');
        star4.body.gravity.y = 1000;
        star4.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star5 = stars.create(500, 1900, 'diamond');
        star5.body.gravity.y = 1000;
        star5.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star6 = stars.create(400, 1800, 'diamond');
        star6.body.gravity.y = 1000;
        star6.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star7 = stars.create(80, 1800, 'diamond');
        star7.body.gravity.y = 1000;
        star7.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star8 = stars.create(150, 1600, 'diamond');
        star8.body.gravity.y = 1000;
        star8.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star9 = stars.create(350, 1300, 'diamond');
        star9.body.gravity.y = 1000;
        star9.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star10 = stars.create(450, 1300, 'diamond');
        star10.body.gravity.y = 1000;
        star10.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star11 = stars.create(350, 1100, 'diamond');
        star11.body.gravity.y = 1000;
        star11.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star12 = stars.create(80, 1100, 'diamond');
        star12.body.gravity.y = 1000;
        star12.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star13 = stars.create(80, 1200, 'diamond');
        star13.body.gravity.y = 1000;
        star13.body.bounce.y = 0.7 + Math.random() * 0.2;
        var counter = 0;
        for (var i = 0; i < 12; i++) {
            counter += 50;
            var star = stars.create(80, 1100 - counter, 'diamond');
            star.body.allowGravity = false;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        };
        var star14 = stars.create(490, 1000, 'diamond');
        star14.body.gravity.y = 1000;
        star14.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star15 = stars.create(370, 900, 'diamond');
        star15.body.gravity.y = 1000;
        star15.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star16 = stars.create(270, 900, 'diamond');
        star16.body.gravity.y = 1000;
        star16.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star17 = stars.create(270, 820, 'diamond');
        star17.body.allowGravity = false;
        star17.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star18 = stars.create(270, 720, 'diamond');
        star18.body.gravity.y = 1000;
        star18.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star19 = stars.create(360, 530, 'diamond');
        star19.body.gravity.y = 1000;
        star19.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star20 = stars.create(520, 480, 'diamond');
        star20.body.gravity.y = 1000;
        star20.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star21 = stars.create(250, 260, 'diamond');
        star21.body.gravity.y = 1000;
        star21.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star22 = stars.create(360, 260, 'diamond');
        star22.body.gravity.y = 1000;
        star22.body.bounce.y = 0.7 + Math.random() * 0.2;
        var star23 = stars.create(100, 260, 'diamond');
        star23.body.gravity.y = 1000;
        star23.body.bounce.y = 0.7 + Math.random() * 0.2;
        //beta stars


        scoreText = this.add.text(100, 2400, 'score: 0', { fontSize: '32px', fill: '#000' });
        winText = this.add.text(this.world.centerX, this.world.centerY, "You Win!", { font: '32px Arial', fill: '#fff' });
        winText.visible = false;
        winText.fixedToCamera = true;
        scoreText.fixedToCamera = true;

        this.stage.backgroundColor = '#3A5963';
        this.physics.arcade.gravity.y = 1400;


        map = this.add.tilemap('map');
        //collision tiles
        map.setCollisionBetween(0, 21);
        map.setCollisionBetween(24, 100);
        map.setTileIndexCallback(33, this.resetPlayer, this);
        map.setTileIndexCallback(34, this.resetPlayer, this);

        //
        player = this.add.sprite(100, 2400, 'player');
        player.anchor.setTo(0.5, 0.5);
        player.animations.add('right', [0, 1, 2, 3], 10, true);
        player.animations.add('left', [5, 6, 7, 8], 10, true);
        player.animations.add('jump', [4], 1, true);
        player.animations.add('idle', [4], 1, true);


        this.physics.arcade.enable(player);
        this.camera.follow(player);
        player.body.collideWorldBounds = true;
        player.body.bounce.y = 0.2;


        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.A),
            left: this.input.keyboard.addKey(Phaser.Keyboard.D),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        };

        map.addTilesetImage('preloader', 'tileset');
        layer = map.createLayer(0);
        layer.resizeWorld();


        drag = this.add.sprite(player.x, player.y, 'drag');
        drag.anchor.setTo(0.5, 0.5);
        drag.inputEnabled = true;
        drag.input.enableDrag(true);

        //enemy

        enemy1 = new EnemyBird(0, game, player.x + 400, player.y - 200);

        //bullets
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        //how many bullets
        bullets.createMultiple(5, 'bullet');

        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);

        //size of bullets
        bullets.setAll('scale.x', 0.5);
        bullets.setAll('scale.y', 0.5);

        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

    },
    update: function () {
        console.log("playerLEvel: ", playerLevel);
        console.log("score", score);

        if(playerLevel >= 5){
            playerSpeed = 500
        }

        this.physics.arcade.collide(stars, layer);
        //beta stars
        this.physics.arcade.overlap(player, stars, collectStar, null, this);
        //beta stars
        
        this.physics.arcade.collide(player, layer);
        this.physics.arcade.collide(player, enemy1.bird, this.resetPlayer);

        // Experience 
        playerLevel = Math.log(playerXP,gameXPsteps);
       
        player.body.velocity.x = 0;
        if (controls.right.isDown) {
            player.animations.play('right');
            player.scale.setTo(1, 1);
            player.body.velocity.x -= playerSpeed;
        }
        if (controls.left.isDown) {
            player.animations.play('left');
            player.scale.setTo(1, 1);
            player.body.velocity.x += playerSpeed;
        }
        if (controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer) {
            player.body.velocity.y = -900;
            jumpTimer = this.time.now + 750;
        }
        if (controls.up.isUp && controls.left.isUp && controls.right.isUp) {
            player.animations.play('idle');
            player.animations.play('jump');
        }

        if (controls.shoot.isDown) {
            this.shootBullet();
        }
        scoreText.text = 'Score: ' + score;

        if (checkOverlap(bullets, enemy1.bird)) {
            enemy1.bird.kill();
            score += 30;
            playerXP += 15;
            console.log("Current XP: ", playerXP);
            console.log("Level: ", playerLevel);

        }
        if (score === 570) {
            winText.visible = true;
            scoreText.visible = false;
        }
    },
    resetPlayer: function () {
        //same as spawn
        player.reset(100, 2400);
    },
    shootBullet: function () {
        if (this.time.now > shootTime) {
            bullet = bullets.getFirstExists(false);
            if (bullet) {
                bullet.reset(player.x, player.y);
                bullet.body.velocity.x = 1000;
                shootTime = this.time.now + 600;
            }
        }
    }
}
function collectStar(player, star) {
    star.kill();
    score += 10;
    playerXP += 15;
    scoreText.text = 'Score: ' + score;
    console.log("Current XP: ", playerXP);
            console.log("Level: ", playerLevel);

}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}