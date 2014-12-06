function loop (t) {

	time = t || 0;
	var elapsed_time = time - old_timestamp;
	old_timestamp = time;
	delta_time = elapsed_time * .06; // 60 fps

	switch (current_sc) {

		case SC_GAME:
			actions();
			draw_sc_game();
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


function actions () {

	// logic,
	// collisions,
	// physics,
	// ia,
	// etc.
}