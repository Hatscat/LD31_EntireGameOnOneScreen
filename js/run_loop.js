function loop (t)
{
	time = t || 0;
	var last_turn_nb = turn_nb;
	turn_nb = time/STEP_TIMER | 0;
	var new_turn = turn_nb > last_turn_nb;

	if (new_turn) {
		tmp_map_mobiles = new Uint8Array(map_mobiles_buf.slice(0));
		col_ctx.clearRect(0, 0, W, H);
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

				if (new_turn && tmp_map_mobiles[i]) {
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

	buf_ctx.drawImage(statics_buffer, 0, 0);
	buf_ctx.drawImage(collectibles_buffer, 0, 0);
	buf_ctx.drawImage(mobiles_buffer, 0, 0);

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

function get_cell_from_xy (xy) {
	return xy[0] + xy[1]*COLS | 0;
}
