Game.Preloader = function(game){
     this.preloadBar = null;
};

Game.Preloader.prototype = {
    preload:function(){

        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

        this.preloadBar.anchor.setTo(0.5,0.5);

        this.time.advancedTiming = true;

        this.load.setPreloadSprite(this.preloadBar);
        console.log('text');
        this.load.tilemap('map', 'assets/Level1.csv', null, Phaser.Tilemap.CSV);
        this.load.image('tileset', 'assets/ts.png');


        this.load.spritesheet('player', 'assets/dude.png',32,45)



    },


create:function(){

    this.state.start('Level1');

}
}
