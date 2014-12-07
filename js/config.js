function init_config () {

	SC_LOAD = 1;
	SC_GAME = 2;
	TRANS_DURATION = 1e3;
	STEP_TIMER = 200;
	LEFT = Math.PI;
	RIGHT = 0;
	UP = Math.PI * 3 / 2;
	DOWN = Math.PI / 2;
	HP_MAX = 3;

	WEAPONS = {
		sword: { range: 1 },
		mace: { range: 1 },
		fire_ball: { range: 3 }
	};

	MOBS_I = {
		gobelin: { nb: 5, speed: 1, damage: 1, range: 1 },
		golem: { nb: 1, speed: .3, damage: 2, range: 1, resist: [WEAPONS.sword, WEAPONS.fire_ball] },
		archer: { nb: 3, speed: .8, damage: 1, range: 4, resist: [WEAPONS.sword] }
	};

	MAP_STATICS_I = {
		wall: 1,
		empty: 2,
		in_build: 7
	};

	MAP_COLLECTIBLES_I = {
		gold: 1,
		empty: 0,
		trap: 3,
		weapon_sword: 4,
		weapon_mace: 5,
		weapon_fire_ball: 6
	};

	MAP_MOBILES_I = {};
	for (var i=8*4; i--;) {
		MAP_MOBILES_I[['player','gobelin','golem','archer','sword','mace','fire_ball','arrow'][i/4|0]+'_'+['left','right','up','down'][i%4]] = 1+i;
	}

	INPUT_KEYCODES_I = {
		left: new Uint8Array([37, 81, 65]), // left arrow, q, a
		right: new Uint8Array([39, 68]), // right arrow, d
		up: new Uint8Array([38, 90, 87]), // up arrow, z, w
		down: new Uint8Array([40, 83]), // down arrow, s
		attack: new Uint8Array([32, 88, 67]) // space, x, c
	};

	canvas = document.getElementById('CANVAS');
	main_buffer = canvas.cloneNode();
	statics_buffer = canvas.cloneNode();
	collectibles_buffer = canvas.cloneNode();
	mobiles_buffer = canvas.cloneNode();
	transition_buffer = canvas.cloneNode();
	real_ctx = canvas.getContext('2d');
	buf_ctx = main_buffer.getContext('2d');
	stat_ctx = statics_buffer.getContext('2d');
	col_ctx = collectibles_buffer.getContext('2d');
	mob_ctx = mobiles_buffer.getContext('2d');
	trans_ctx = transition_buffer.getContext('2d');
	current_sc = SC_LOAD;
	is_transition = false;
	time_2_transition = 0;
	turn_nb = 0;
	score = 0;
	current_hp = HP_MAX;
	current_weapon = null;
	inputs = new Uint8Array(0xFF);
	inputs_buf = new Uint8Array(0xFF);
	map_mobiles_buf = new ArrayBuffer(0xFFF);
	map_mobiles = new Uint8Array(map_mobiles_buf);
	map_collectibles = new Uint8Array(0xFFF);
	map_statics = new Uint8Array(0xFFF);
	map_path = new Uint8Array(0xFFF);
	dtMath = DirtyMath(window, null, new ArrayBuffer(4e5));
	dtMath.init();
	set_size();
	fill_maps();
}

function set_size () {

	canvas.width = main_buffer.width = statics_buffer.width = collectibles_buffer.width = mobiles_buffer.width = transition_buffer.width = W = window.innerWidth;
	canvas.height = main_buffer.height = statics_buffer.height = collectibles_buffer.height = mobiles_buffer.height = transition_buffer.height = H = window.innerHeight;
	min_length = W < H ?  W : H;
	CELL_SIZE = min_length * .06;
	hcs = CELL_SIZE / 2;
	TEXT_FONT_SIZE = min_length * .1;
	COLS = W / CELL_SIZE | 0;
	ROWS = H / CELL_SIZE | 0;
	CELLS_NB = COLS * ROWS;

	set_render_settings();
}

function set_render_settings () {

	buf_ctx.textAlign = 'center';
	buf_ctx.textBaseline = 'top';
	buf_ctx.shadowColor = "#f33";
	//buf_ctx.globalAlpha = .5;
	text_font = TEXT_FONT_SIZE + "px Deutsch";
}

function set_sprites () {

	sprites_src_box = {
		statics: [],
		collectibles: [],
		mobiles: []
	};

	var spt_static_w = img.statics.width / data_list.spritesheets.statics.COLS;
	var spt_static_h = img.statics.height / data_list.spritesheets.statics.ROWS;
	var spt_collectible_w = img.collectibles.width / data_list.spritesheets.collectibles.COLS;
	var spt_collectible_h = img.collectibles.height / data_list.spritesheets.collectibles.ROWS;
	var spt_mobile_w = img.mobiles.width / data_list.spritesheets.mobiles.COLS;
	var spt_mobile_h = img.mobiles.height / data_list.spritesheets.mobiles.ROWS;

	for (var i=data_list.spritesheets.statics.sprites.length; i--;) {

		sprites_src_box.statics[MAP_STATICS_I[data_list.spritesheets.statics.sprites[i]]|0] = new Uint8Array([
			i % data_list.spritesheets.statics.COLS * spt_static_w,
			(i/data_list.spritesheets.statics.COLS|0) * spt_static_h,
			spt_static_w,
			spt_static_h
		]);
	}

	for (var i=data_list.spritesheets.collectibles.sprites.length; i--;) {

		sprites_src_box.collectibles[MAP_COLLECTIBLES_I[data_list.spritesheets.collectibles.sprites[i]]|0] = new Uint8Array([
			i % data_list.spritesheets.collectibles.COLS * spt_static_w,
			(i/data_list.spritesheets.collectibles.COLS|0) * spt_static_h,
			spt_static_w,
			spt_static_h
		]);
	}

	for (var i=data_list.spritesheets.mobiles.spritesheets.length*4; i--;) {

		sprites_src_box.mobiles[MAP_MOBILES_I[data_list.spritesheets.mobiles.spritesheets[i/4|0]+'_'+['left','right','up','down'][i%4]]|0] = new Uint16Array([
			(i%(data_list.spritesheets.mobiles.COLS/2)) * 2 * spt_mobile_w,
			(i/(data_list.spritesheets.mobiles.COLS/2)|0) * spt_mobile_h,
			spt_mobile_w,
			spt_mobile_h,
			(i%(data_list.spritesheets.mobiles.COLS/2)*2+1) * spt_mobile_w
		]);
	}

}

function fill_maps () {

	map_mobiles[dtMath.rnd255()/255*CELLS_NB|0] = MAP_MOBILES_I.player_down;

	map_collectibles[dtMath.rnd255()/255*CELLS_NB|0] = MAP_COLLECTIBLES_I.weapon_sword;
	map_collectibles[dtMath.rnd255()/255*CELLS_NB|0] = MAP_COLLECTIBLES_I.weapon_mace;
	map_collectibles[dtMath.rnd255()/255*CELLS_NB|0] = MAP_COLLECTIBLES_I.weapon_fire_ball;
	map_collectibles[dtMath.rnd255()/255*CELLS_NB|0] = MAP_COLLECTIBLES_I.trap;
	map_collectibles[dtMath.rnd255()/255*CELLS_NB|0] = MAP_COLLECTIBLES_I.trap;
	map_collectibles[dtMath.rnd255()/255*CELLS_NB|0] = MAP_COLLECTIBLES_I.trap;

	for (var i=CELLS_NB; i--;) {

		if (!map_statics[i]) {
			map_statics[i] = MAP_STATICS_I.empty;
		}
		if (!map_collectibles[i]) {
			map_collectibles[i] = MAP_COLLECTIBLES_I.gold;
		}
	}
}