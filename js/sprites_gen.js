//comment useless

function sprite () {

	var c = document.createElement('canvas');
	c.width = W;
	c.height = H;
	var ctx = c.getContext('2d');

	ctx.fillStyle = '#aaa';
	ctx.fillRect(0, 0, W, H);

	return c;
}