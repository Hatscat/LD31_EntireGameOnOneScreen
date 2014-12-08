function load_data (cb) {

	data_list = new XMLHttpRequest();
	data_list.open('GET', 'data_list.json', true);
	data_list.onload = function () { load_assets(cb) };
	data_list.send(null);
}

function load_assets (cb) {

	data_list = JSON.parse(data_list.response);
	loaded_data_nb = 0;
	data_nb_2_load = data_list.img.length + data_list.audio.length;
	img = {};
	audio = {};

	for (var i=data_list.img.length; i--;) {
		img[data_list.img[i].name] = load_image(data_list.img[i].url);
	}
	for (var i=data_list.audio.length; i--;) {
		audio[data_list.audio[i].name] = load_audio(data_list.audio[i].url);
	}
	cb();
}

function load_image (src) {

	var img = new Image();
	img.src = src;
	img.onload = loaded_content;
	return img;
}

function load_audio (src) {

	var audio = new Audio();
	audio.src = src;
	audio.oncanplaythrough = loaded_content;
	return audio;
}

function loaded_content () {

	if (++loaded_data_nb >= data_nb_2_load) {

		//console.log('load complete: ', loaded_data_nb+'/'+data_nb_2_load);

		audio.bg_music.loop = true;
		//audio.bg_music.play();
		set_sprites();
		change_sc(SC_GAME);
	}
}
