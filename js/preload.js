var preload = function(game){}
preload.prototype = {
	preload: function()
	{
		this.game.debug.text("LOADING...",this.game.world.centerX,this.game.world.centerY);
		this.game.stage.backgroundColor = 0x8b8d8a;
		var loadingBar = this.add.sprite(0,480,"loading");
		loadingBar.anchor.setTo(0.0,1.0);
		this.load.setPreloadSprite(loadingBar);
		this.game.load.audio('bg', 'assets/audio/bg.mp3');
		this.game.load.image("cloud1","assets/imgs/cloud-1.png");
		this.game.load.image("cloud2","assets/imgs/cloud-2.png");
		this.game.load.image("cloud3","assets/imgs/cloud-3.png");
		this.game.load.image("mill","assets/imgs/body.png");
		this.game.load.image("pas","assets/imgs/pas.png");
		this.game.load.image("ground","assets/imgs/ground.png");
	},
	create: function()
	{
		this.game.state.start('Game');
	},
	update: function() {
	}
}