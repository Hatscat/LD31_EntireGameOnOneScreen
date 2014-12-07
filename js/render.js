function draw_statics () {

	for (var i=CELLS_NB; i--;) {

		var xy = get_xy(i);

		stat_ctx.drawImage(img.statics,
			sprites_src_box.statics[map_statics[i]][0],
			sprites_src_box.statics[map_statics[i]][1],
			sprites_src_box.statics[map_statics[i]][2],
			sprites_src_box.statics[map_statics[i]][3],
			xy[0]*CELL_SIZE, xy[1]*CELL_SIZE, CELL_SIZE, CELL_SIZE);
	}
}

function draw_collectibles (xy, collectible) {

	col_ctx.drawImage(img.collectibles,
		sprites_src_box.collectibles[collectible][0],
		sprites_src_box.collectibles[collectible][1],
		sprites_src_box.collectibles[collectible][2],
		sprites_src_box.collectibles[collectible][3],
		xy[0]*CELL_SIZE, xy[1]*CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function draw_mobile (xy, last_xy, step_ratio, mobile) {

	mob_ctx.drawImage(img.mobiles,
		sprites_src_box.mobiles[mobile][turn_nb%2?4:0],
		sprites_src_box.mobiles[mobile][1],
		sprites_src_box.mobiles[mobile][2],
		sprites_src_box.mobiles[mobile][3],
		lerp_pos(last_xy[0], xy[0], step_ratio)*CELL_SIZE, lerp_pos(last_xy[1], xy[1], step_ratio)*CELL_SIZE, CELL_SIZE, CELL_SIZE);
}


function draw_sc_load () {

	buf_ctx.fillStyle = '#eee';
	buf_ctx.fillRect(0, 0, W, H);
	buf_ctx.fillStyle = '#711';
	buf_ctx.fillRect(W*.2, H*.4, W*.6, H*.2);
	buf_ctx.fillStyle = '#e22';
	buf_ctx.fillRect(W*.2, H*.4, W*.6*loaded_data_nb/data_nb_2_load, H*.2);
}

/* animation (linear interpolation) */
	
function lerp_pos (p0, p1, t) {
	return (1-t)*p0 + t*p1;
}

function lerp_dir (p0, p1, t) {
	var dif = p1-p0;
	p1 += p1<0 ? PI2 : p1>PI2 ? -PI2 : 0;
	return (1-t)*p0 + t*(p1+(dif*dif<PI2 ? 0 : p0<p1 ? -PI2 : PI2));
}