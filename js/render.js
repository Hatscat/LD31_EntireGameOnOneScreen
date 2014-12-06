function draw_sc_game () {

	buf_ctx.fillStyle = '#eee';
	buf_ctx.fillRect(0, 0, W, H);
}

function draw_sc_load () {

	buf_ctx.fillStyle = '#eee';
	buf_ctx.fillRect(0, 0, W, H);
	buf_ctx.fillStyle = '#711';
	buf_ctx.fillRect(W*.2, H*.4, W*.6, H*.2);
	buf_ctx.fillStyle = '#e22';
	buf_ctx.fillRect(W*.2, H*.4, W*.6*loaded_data_nb/data_nb_2_load, H*.2);
}
