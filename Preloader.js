Game.Preloader = function (game) {
    this.preloadBar = null;
};

Game.Preloader.prototype = {
    preload: function () {

        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

        this.preloadBar.anchor.setTo(0.5, 0.5);

        this.time.advancedTiming = true;

        this.load.setPreloadSprite(this.preloadBar);
        console.log('text');
        // this.load.tilemap('map', 'assets/Level1.csv', null, Phaser.Tilemap.CSV);
        this.load.tilemap('map', 'assets/newMap.csv', null, Phaser.Tilemap.CSV);
        // this.load.image('tileset', 'assets/ts.png');
        this.load.image('tileset', 'assets/tileset.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.spritesheet('player', 'assets/dude.png', 32, 45)
        this.load.image('star', 'assets/star.png');



    },


    create: function () {

        this.state.start('Level1');

    }
}
