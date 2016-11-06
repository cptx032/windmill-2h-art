//////////////////////////////////////////////////////////////////////////////////////
// http://opengameart.org/content/background-voices

// http://opengameart.org/content/rpg-sound-pack
// http://opengameart.org/content/dark-ambiences
// http://opengameart.org/content/ghost
// http://opengameart.org/content/excited-horror-sound
// http://opengameart.org/content/4-atmospheric-ghostly-loops
//////////////////////////////////////////////////////////////////////////////////////
function randint(min, max)
{
	return ~~(min + ((max-min)*Math.random()));
}
function lerp(a, b, x) {
	return a + ((b-a)*x);
}
function choice(l) {
	return l[Math.floor(Math.random() * l.length)];
}
function randomrange(min, max) {
	return lerp(min, max, Math.random());
}

function enable_fullscreen()
{
	var elem = document.documentElement;
	if (elem.requestFullscreen)
	{
		elem.requestFullscreen();
	}
	else if (elem.msRequestFullscreen)
	{
		elem.msRequestFullscreen();
	}
	else if (elem.mozRequestFullScreen)
	{
		elem.mozRequestFullScreen();
	}
	else if (elem.webkitRequestFullscreen)
	{
		elem.webkitRequestFullscreen();
	}
}
var KMAP = {};
var UP_KEY = 38;
var DOWN_KEY = 40;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var W_KEY = 87;
var S_KEY = 83;

var ON_KEY_DOWN = [];

document.documentElement.onkeydown = function(key)
{
	key = key || window.key;
	KMAP[key.keyCode] = true;
	for(var i=0; i < ON_KEY_DOWN.length; i++)
	{
		ON_KEY_DOWN[i](key);
	}
};
document.documentElement.onkeyup = function(key)
{
	key = key || window.key;
	KMAP[key.keyCode] = false;
};
//////////////////////////////////////////////////////////////////////////////////////
var MenuButton = function(game, x, y, text, event, event_parent)
{
	this.game = game;
	this.style = { font: "40px Terminal", fill: "#ffffff", align: "left" };
	this.button = this.game.add.text(x, y, text, this.style);
	this.button.alpha = 0.0;
	this.button.inputEnabled = true;
	this.button.anchor.set(0.0);
	var initial_tween = this.game.add.tween(this.button);
	initial_tween.to( { alpha: 0.5 }, 2000, "Linear", true);
	initial_tween.onComplete.add(
		function()
		{
			this.button.events.onInputOver.add(
				function()
				{
					this.__mouse_over(this.button);
				},
			this);
			this.button.events.onInputOut.add(
				function()
				{
					this.__mouse_leave(this.button);
				},
			this);
			this.button.events.onInputDown.add(event, event_parent);
		},
	this);
};
MenuButton.prototype.__mouse_over = function(button)
{
	this.game.add.tween(button).to( { alpha: 0.8 }, 500, "Linear", true);
	document.body.style.cursor = 'pointer';
};
MenuButton.prototype.__mouse_leave = function(button)
{
	this.game.add.tween(button).to( { alpha: 0.5 }, 500, "Linear", true);
	document.body.style.cursor = 'default';
};
//////////////////////////////////////////////////////////////////////////////////////
function lerp(a, b, c) {
	return a + ((b-a)*c);
}

function __(msg) {
	console.log(msg);
}

var phase01 = function(game){};
phase01.prototype = {
	preload: function()
	{
		this.music = this.game.add.audio('bg');
		this.music.loop = true;
		this.music.play();
		
		this.mill = this.game.add.sprite(this.game.world.centerX,
			this.game.world.centerY, 'mill');
		this.mill.anchor.setTo(0.5, 0.5);
		this.mill.scale.setTo(0.2, 0.2);

		this.ground = this.game.add.sprite(this.game.world.centerX,
			351, 'ground');
		this.ground.anchor.setTo(0.5, 0.5);
		this.ground.scale.setTo(0.5, 0.5);

		this.pas = this.game.add.sprite(this.game.world.centerX,
			this.game.world.centerY-40, 'pas');
		this.pas.anchor.setTo(0.5, 0.5);
		this.pas.scale.setTo(0.26, 0.26);

		window.lll = this.ground;

		this.clouds = [];
		this.create_clouds();
		this.create_footer();
	},
	create_clouds: function() {
		var MAX_CLOUDS = 5;
		while(MAX_CLOUDS--) {
			var sprite_name = choice(['cloud1', 'cloud2', 'cloud3']);
			var cloud = this.game.add.sprite(randomrange(-30, 1000),
			this.game.world.centerY-randomrange(-30, 70)*2, sprite_name);
			cloud.scale.setTo(0.2, 0.2);
			cloud.anchor.setTo(0, 1);
			this.clouds.push(cloud);
		}
	},
	create_footer: function()
	{
		this.footer = new MenuButton(this.game, this.game.world.width, this.game.world.height,
			'created by willie lawrence - windmill - 30 min art',
			function(){
				window.location = "http://vls2.tk";
			}, this);
		this.footer.button.anchor.set(1.0);
		this.footer.button.style.font = "15px Terminal";
	},
	create: function()
	{	
	},
	update: function()
	{
		this.pas.angle += 0.3;

		var i = this.clouds.length;
		while (i--) {
			this.clouds[i].x += 0.5;

			if (this.clouds[i].x >= this.game.world.width) {
				this.clouds[i].x = -100;
			}
		}
	}
};