EnemyBird = function(index,game,x,y){
    this.bird = game.add.sprite(x,y,'bird');
    this.bird.anchor.setTo(0.5,0.5);
    this.bird.name = index.toString();
    game.physics.enable(this.bird,Phaser.Physics.ARCADE);
    this.bird.body.immovable = true;
    this.bird.body.collideWorldBounds = true;
    this.bird.body.allowGravity = false;

    this.birdTween = game.add.tween(this.bird).to({
        y: this.bird.y + 100
    },2000,'Linear',true,0,100,true);
    


}

var enemy1;




Game.Level1 = function (game) { };
var map;
var layer;
var bullets;
var stars;
var shootTime =0;
var player;
var controls = {};
var playerSpeed = 200;
var jumpTimer = 0;
var drag;

Game.Level1.prototype = {
    create: function (game) {

        this.stage.backgroundColor = '#3A5963';
        this.physics.arcade.gravity.y = 1400;


        map = this.add.tilemap('map');
        //collision tiles
        map.setCollisionBetween(0, 20);
        map.setTileIndexCallback(33,this.resetPlayer,this);
        map.setTileIndexCallback(79,this.getCoin,this);



        //
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
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            shoot: this.input.keyboard.addKey(Phaser.Keyboard.UP)

        };

        map.addTilesetImage('preloader', 'tileset');
        layer = map.createLayer(0);
        layer.resizeWorld();

       
        drag = this.add.sprite(player.x, player.y, 'drag');
        drag.anchor.setTo(0.5, 0.5);
        drag.inputEnabled = true;
        drag.input.enableDrag(true);

        //enemy

        enemy1 = new EnemyBird(0,game,player.x+400,player.y-200);

        //bullets
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        //how many bullets
        bullets.createMultiple(5,'bullet');

        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);

        //size of bullets
        bullets.setAll('scale.x', 0.5);
        bullets.setAll('scale.y', 0.5);

        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

            


    },
    update: function () {
        this.physics.arcade.collide(stars, layer);
        // this.physics.arcade.overlap(player, stars, collectStar, null, this);
        player.body.velocity.x = 0;
        this.physics.arcade.collide(player, layer);
        this.physics.arcade.collide(player, enemy1.bird,this.resetPlayer);
      

        
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
        
        if (controls.shoot.isDown){
            this.shootBullet();
        }
        if(checkOverlap(bullets, enemy1.bird)){
            enemy1.bird.kill();
        }


    },
    resetPlayer:function(){
        //same as spawn
        player.reset(100,560);
    },
    getCoin:function(){
        map.putTile(-1,layer.getTileX(player.x), layer.getTileY(player.y));
    },
    shootBullet:function(){
        if(this.time.now > shootTime){
            bullet = bullets.getFirstExists(false);
            if(bullet) {
                bullet.reset(player.x,player.y);

                bullet.body.velocity.y = -600;

                shootTime = this.time.now + 600;
            }
        }
    }

    


}

function checkOverlap(spriteA,spriteB){
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA,boundsB);
}














// function collectStar (player, star) {

//     star.kill();
//     // score += 10;
//     // scoreText.text = 'Score: ' + score;

// }

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