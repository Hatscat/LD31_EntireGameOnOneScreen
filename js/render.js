function draw_static (xy, static) {

	/*buf_ctx.fillStyle = '#eee';
	buf_ctx.fillRect(0, 0, W, H);

	player_pos = get_xy(player.cell);
	buf_ctx.fillRect(player_pos[0], player_pos[1]);*/

	buf_ctx.drawImage(img.statics, sprites_src_box.statics[static][0], sprites_src_box.statics[static][1], sprites_src_box.statics[static][2], sprites_src_box.statics[static][3], xy[0]*CELL_SIZE, xy[1]*CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function draw_gold (xy) {

	buf_ctx.drawImage(img.gold, sprites_src_box.gold[0], sprites_src_box.gold[1], sprites_src_box.gold[2], sprites_src_box.gold[3], xy[0]*CELL_SIZE, xy[1]*CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function draw_mobile (xy, last_xy, step_ratio, mobile) {
	//console.log(last_xy[0]!=xy[0]&&last_xy[1]!=xy[1])
	mob_ctx.drawImage(img.mobiles, sprites_src_box.mobiles[mobile][0], sprites_src_box.mobiles[mobile][1], sprites_src_box.mobiles[mobile][2], sprites_src_box.mobiles[mobile][3], lerp_pos(last_xy[0], xy[0], step_ratio)*CELL_SIZE, lerp_pos(last_xy[1], xy[1], step_ratio)*CELL_SIZE, CELL_SIZE, CELL_SIZE);
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