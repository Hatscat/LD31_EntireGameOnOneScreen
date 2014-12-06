function init_config () {

	SC_LOAD = 1;
	SC_GAME = 2;
	TRANS_DURATION = 1e3;

	canvas = document.getElementById('CANVAS');
	main_buffer = canvas.cloneNode();
	transition_buffer = CANVAS.cloneNode();
	real_ctx = canvas.getContext('2d');
	buf_ctx = main_buffer.getContext('2d');
	trans_ctx = transition_buffer.getContext('2d');
	current_sc = SC_LOAD;
	next_sc = SC_GAME;
	is_transition = false;
	time_2_transition = 0;
	delta_time = 1;
	time = 0;
	old_timestamp = 0;
	dtMath = DirtyMath(window, null, new ArrayBuffer(8e5));
	dungeon = [];
	set_size();
}

function set_size () {

	canvas.width = main_buffer.width = transition_buffer.width = W = window.innerWidth;
	canvas.height = main_buffer.height = transition_buffer.height = H = window.innerHeight;
	min_length = W < H ?  W : H;
	CELL_SIZE = min_length * .2;
	TEXT_FONT_SIZE = min_length * .1;

	set_render_settings();
}

function set_render_settings () {

	buf_ctx.textAlign = 'center';
	buf_ctx.textBaseline = 'top';
	buf_ctx.shadowColor = "#f33";
	text_font = TEXT_FONT_SIZE + "px Deutsch";

	/*fric_grad = buf_ctx.createLinearGradient(0, 0, 0, FRIC_FONT_SIZE);
	fric_grad.addColorStop(0, '#333');
	fric_grad.addColorStop(.5, '#fff');
	fric_grad.addColorStop(1, '#333');

	text_margin_h = FRIC_FONT_SIZE * .1;

	coin_sprites = create_coin_sprites();
	back_bt_sprite = create_back_bt();
	info_bt_sprite = create_info_bt();
	achievement_star_sprites = create_achievements();*/
}
