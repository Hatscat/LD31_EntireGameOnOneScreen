function loop (t) {
	
	time_offset = time_offset ? time_offset : t;

	time = t - time_offset;
	var last_turn_nb = turn_nb;
	turn_nb = time/STEP_TIMER | 0;
	var new_turn = turn_nb > last_turn_nb;

	if (new_turn) {

		tmp_map_mobiles = new Uint8Array(map_mobiles_buf.slice(0));
		buf_ctx.fillStyle = '#000';
		buf_ctx.fillRect(0, 0, W, H);
		col_ctx.clearRect(0, 0, W, H);
		gui_ctx.fillStyle = '#675';
		gui_ctx.fillRect(0, 0, W, header_h);
		gui_ctx.fillStyle = '#000';
		gui_ctx.fillText('Castle-Man', W/2, 0);

		gui_ctx.fillText(current_hp?current_hp+"\u2665":'\u2620', W/4, CELL_SIZE); // U+2665 : U+2620 // ♥ // ☠
		gui_ctx.fillText(score+'\u25CE', W/2, CELL_SIZE); // U+25CE // ◎

		if (current_weapon) {
			gui_ctx.drawImage(img.collectibles,
				sprites_src_box.collectibles[current_weapon][0],
				sprites_src_box.collectibles[current_weapon][1],
				sprites_src_box.collectibles[current_weapon][2],
				sprites_src_box.collectibles[current_weapon][3],
				W*3/4-hcs, CELL_SIZE, CELL_SIZE, CELL_SIZE);
		} else {
			gui_ctx.fillText('\u270C', W*3/4, CELL_SIZE); // U+270C // ✌
		}

		if (turn_nb%MOB_SPAWN_TURN == 0) {

			var rnd = dtMath.rnd255();
			map_mobiles[get_cell_from_xy(COLS/2|0,ROWS/2|0)] = rnd<70 ? MAP_MOBILES_I.golem_down : rnd<150 ? MAP_MOBILES_I.archer_down : MAP_MOBILES_I.gobelin_down;
		}
	}

	mob_ctx.clearRect(0, 0, W, H);

	switch (current_sc) {

		case SC_GAME:

			var step_ratio = time % STEP_TIMER / STEP_TIMER;

			for (var i=CELLS_NB; i--;) {

				var xy = get_xy(i);

				if (new_turn && map_collectibles[i]) {
					draw_collectibles(xy, map_collectibles[i]);
				}

				if (map_mobiles[i]) {
					var dir = (map_mobiles[i]-1) % 4;
					var d = dir<2 ? dir*2-1 : dir==2 ? -COLS: COLS; // 0 = -1; 1 = 1; 2 = -COLS; 3 = COLS
					var old_dir = (tmp_map_mobiles[i-d]-1) % 4;
					var last_xy = map_mobiles[i]!=tmp_map_mobiles[i] && map_mobiles[i]-dir==tmp_map_mobiles[i-d]-old_dir ? get_xy(i-d) : xy;
					draw_mobile(xy, last_xy, step_ratio, map_mobiles[i]);
				}

				if (new_turn && turn_nb>7 && tmp_map_mobiles[i]) {
					update_mobile(i, tmp_map_mobiles[i], xy);
				}

			}
			if (new_turn) {
			for (i in INPUT_KEYCODES_I)
				for (ii in INPUT_KEYCODES_I[i])
				{
					inputs[INPUT_KEYCODES_I[i][ii]] = inputs_buf[INPUT_KEYCODES_I[i][ii]];
				}
			}
		break;
		case SC_LOAD:
			draw_sc_load();
		break;
	}

	buf_ctx.drawImage(statics_buffer, 0, header_h);
	buf_ctx.drawImage(collectibles_buffer, 0, header_h);
	buf_ctx.drawImage(mobiles_buffer, 0, header_h);
	buf_ctx.drawImage(gui_buffer, 0, 0);

	real_ctx.drawImage(main_buffer, 0, 0);
	
	if (is_transition) {
		transition();
		real_ctx.drawImage(transition_buffer, 0, 0);
	}
	requestAnimationFrame(loop);
}

function update_mobile (cell, mobile) {
	//map_mobiles map_static map_gold
	if (!map_mobiles[cell])
		return ;
	//console.log("cell :" + cell + ", coord :" + get_xy(cell) + ", type :" + mobile);
	for (var i = 4 ; i--;)
		switch (mobile)
		{
			case MAP_MOBILES_I["player_" + ["left", "right", "up", "down"][i]]:
				update_player(cell, mobile);
				return ;
			break;
			case MAP_MOBILES_I["gobelin_" + ["left", "right", "up", "down"][i]]:
				update_gobelin(cell, mobile);
				return ;
			break;
			case MAP_MOBILES_I["archer_" + ["left", "right", "up", "down"][i]]:
				update_archer(cell, mobile);
				return ;
			break;
			case MAP_MOBILES_I["golem_" + ["left", "right", "up", "down"][i]]:
				update_golem(cell, mobile);
				return ;
			break;
			case MAP_MOBILES_I["sword_" + ["left", "right", "up", "down"][i]]:
				update_sword(cell, mobile);
				return ;
			break;
			case MAP_MOBILES_I["mace_" + ["left", "right", "up", "down"][i]]:
				update_mace(cell, mobile);
				return ;
			break;
			case MAP_MOBILES_I["fire_ball_" + ["left", "right", "up", "down"][i]]:
				update_fire_ball(cell, mobile);
				return ;
			break;
			case MAP_MOBILES_I["arrow_" + ["left", "right", "up", "down"][i]]:
				update_arrow(cell, mobile);
				return ;
			break;
		}
	// move,
	// logic,
	// collisions,
	// ia,
	// etc.
}

///////////////////////////////////////////////////////////////////////////////////////////////////

function distance (p1, p2) {

	var x = p2[0] - p1[0];
	var y = p2[1] - p1[1];

	return dtMath.abs(x) + dtMath.abs(y);
}

function normalize (dX, dY) {

	var r = dtMath.abs(dX) + dtMath.abs(dY) || 1;

	return { x: dX/r, y: dY/r };
}

function get_xy (c) {
	return [c%COLS, c/COLS|0];
}

function get_cell_from_xy (x, y) {
	return x + y*COLS | 0;
}
