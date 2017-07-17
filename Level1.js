Game.Level1 = function (game) { };
var map;
var layer;
var bullets;
var stars;
var bulletTime =0;
var fireButton;
var player;
var controls = {};
var playerSpeed = 200;
var jumpTimer = 0;

Game.Level1.prototype = {
    create: function () {

        this.stage.backgroundColor = '#3A5963';
        this.physics.arcade.gravity.y = 1400;


        map = this.add.tilemap('map');
        //collision tiles
        map.setCollisionBetween(0, 900);
        player = this.add.sprite(100, 560, 'player');
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
            up: this.input.keyboard.addKey(Phaser.Keyboard.W)
        };

        map.addTilesetImage('preloader', 'tileset');
        layer = map.createLayer(0);
        layer.resizeWorld();

        stars = this.add.group();

        stars.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var star = stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 1000;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        //bullet
        bullets = this.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        //bullet physics
        bullets.createMultiple(8, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        //
        fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function () {
        this.physics.arcade.collide(stars, layer);
        this.physics.arcade.overlap(player, stars, collectStar, null, this);
        player.body.velocity.x = 0;
        this.physics.arcade.collide(player, layer);

        if (controls.up.isDown) {
            player.animations.play('jump');
        }
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
        }
        // if (fireButton.isDown) {
        //     fireBullet();
        // }


    },
    


}

function collectStar (player, star) {

    star.kill();
    // score += 10;
    // scoreText.text = 'Score: ' + score;

}

// //fires bullet on space down. sets bullet start x:y and velocity. When it gets to the end it cancels
// function fireBullet() {
//     // if (this.time.now > bulletTime) {
//         bullet = bullets.getFirstExists(false);

//         if (bullet) {
//             bullet.reset(player.x + 30, player.y + 40);
//             bullet.body.velocity.x = 1200;
//             bulletTime = this.time.now + 200;
//         }
    
// };