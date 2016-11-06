// noisebg: #dec37a
var boot = function(game){};
boot.prototype = {
	preload: function()
	{
		this.game.load.image("loading","assets/imgs/loading.png");
	},
	create: function()
	{
		this.game.debug.text("BOOT",0,10);
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.stage.scale.forceLandscape = true;

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.game.stage.backgroundColor = 0xeeeeee;
		this.game.scale.forceOrientation(true, false);

		this.game.scale.enterIncorrectOrientation.add(this.handleIncorrect);

		this.game.state.start("Preload");
	},
	handleIncorrect: function()
	{
		alert('para uma melhor experiência utilize seu dispositivo na orientação horizontal');
	}
}