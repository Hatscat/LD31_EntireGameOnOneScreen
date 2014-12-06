function init_events () {

	//onresize = set_size;

	onkeydown = function (e) {
		//console.log(e.keyCode)
		inputs[e.keyCode] = 1;
	}
	onkeyup = function (e) {
		inputs[e.keyCode] = 0;
	}
}
