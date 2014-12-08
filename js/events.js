function init_events () {

	//onresize = set_size;

	onkeydown = function (e) {
		//console.log(e.keyCode)
		inputs[e.keyCode] = 1;
		inputs_buf[e.keyCode] = 1;
	}
	onkeyup = function (e) {
		inputs_buf[e.keyCode] = 0;
	}

	onmouseup = function (e) {
		mouse_target[0] = e.clientX / COLS | 0;
		mouse_target[1] = e.clientY / ROWS | 0;
	}
}

