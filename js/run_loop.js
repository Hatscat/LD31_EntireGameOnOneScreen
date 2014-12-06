function loop (t) {

	time = t || 0;
	var elapsed_time = time - old_timestamp;
	old_timestamp = time;
	delta_time = elapsed_time * .06; // 60 fps

	var last_turn_nb = turn_nb;
	turn_nb = time/STEP_TIMER | 0;

	switch (current_sc) {

		case SC_GAME:

			//buf_ctx.fillStyle = '#000';
			//buf_ctx.fillRect(0, 0, W, H);

			for (var i=CELLS_NB; i--;) {

				if (turn_nb > last_turn_nb) {

					//console.log('update')
					if (map_mobiles[i]) {
						update_mobile(i, map_mobiles[i]);
					}
				}

				draw_static(i, map_statics[i]);

				if (map_golds[i]) {
					draw_gold(i);
				}

				if (map_mobiles[i]) {
					draw_mobile(i, map_mobiles[i]);
				}
			}
		break;
		case SC_LOAD:
			draw_sc_load();
		break;
	}

	real_ctx.drawImage(main_buffer, 0, 0);
	
	if (is_transition) {
		transition();
		real_ctx.drawImage(transition_buffer, 0, 0);
	}
	requestAnimationFrame(loop);
}


function update_mobile (cell, mobile) {


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
	return [c%COLS*CELL_SIZE, (c/COLS|0)*CELL_SIZE];
}

function get_cell_from_xy (xy) {
	return xy[0] + xy[1]*COLS | 0;
}
