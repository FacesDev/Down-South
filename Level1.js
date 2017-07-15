Game.Level1 = function(game) {};
var map;
var layer;
Game.Level1.prototype = {
    create: function () {
      
        this.stage.backgroundColor = '#3A5963';
        map = this.add.tilemap('map');
        console.log(map)
        map.addTilesetImage('preloader', 'tileset');
        layer = map.createLayer(0);
        layer.resizeWorld();
    },
    update: function(){

    },


}