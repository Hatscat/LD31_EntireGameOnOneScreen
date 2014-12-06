onload = function () {

	load_data(function () {
		init_config();
		init_events();
		loop();
	});
}

function change_sc (sc) {

	is_transition = true;
	next_sc = sc;
	time_2_transition = time + TRANS_DURATION;
}

function transition () {

	if (time < time_2_transition-TRANS_DURATION/2) {
		trans_ctx.globalAlpha = (time-time_2_transition+TRANS_DURATION) / TRANS_DURATION * 2;
	} else {
		trans_ctx.globalAlpha = TRANS_DURATION / (time-time_2_transition+TRANS_DURATION) - 1;
		current_sc = next_sc;
	}

	trans_ctx.clearRect(0, 0, W, H);
	trans_ctx.fillRect(0, 0, W, H);


	if (is_transition && time > time_2_transition) {
		is_transition = false;
	}
}