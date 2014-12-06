function DirtyMath (stdlib, foreign, buffer) { // ☃
	"use asm";
	/* buffer should be at least (256+360*3)*4 bytes long */

	var PI_DIV_180 = 0.01745329251994329576; //+stdlib.Math.PI / 180.0
	var PI_MUL_2 = 6.283185307179586; // +stdlib.Math.PI * 2
	// var 180_DIV_PI = 57.29577951308232; // useless?
	var rnd_index = 0;
	var math_rnd = stdlib.Math.random; 
	var math_cos = stdlib.Math.cos;
	var math_sin = stdlib.Math.sin;
	var math_tan = stdlib.Math.tan;
	var rnd_table = new stdlib.Uint8Array(buffer);
	var trigo_table = new stdlib.Float32Array(buffer);

	function reset_rnd () {

		for (var i=0, rnd_i=0; (i|0)<255; ++i|0) {
			while (rnd_table[rnd_i|0]) {
				rnd_i = +math_rnd() * 255 | 0;
			}
			rnd_table[rnd_i|0] = i|0;
		}
		rnd_index = +math_rnd() * 255 | 0;
	}
	
	function init () {

		/* init rnd_table */
		reset_rnd();

		/* init trigo tables */
		for (var i=0; (i|0)<360; ++i|0) {
			trigo_table[i+255|0] = +math_cos((i|0)*+PI_DIV_180);
			trigo_table[i+615|0] = +math_sin((i|0)*+PI_DIV_180);
			trigo_table[i+975|0] = +math_tan((i|0)*+PI_DIV_180);
		}
	}

	function abs (n) {
		return +n<0 ? -n : +n;
	}

	function floor (n) {
		return +n<0 ? n-1|0 : n|0;
	}

	function ceil (n) {
		return +n<0 ? n|0 : n+1|0;
	}

	function round (n) {
		return +n<0 ? n-.5|0 : n+.5|0;
	}

	function rnd255 () {
		return rnd_table[(++rnd_index|0)&0xFF]|0;
	}

	function cos (angle) {
		angle = +abs(+angle) % +PI_MUL_2;
		return +trigo_table[255+angle/PI_DIV_180|0];
	}

	function sin (angle) {
		angle = +abs(+angle) % +PI_MUL_2;
		return +trigo_table[615+angle/PI_DIV_180|0];
	}

	function tan (angle) {
		angle = +abs(+angle) % +PI_MUL_2;
		return +trigo_table[975+angle/PI_DIV_180|0];
	}

	return {
		init: init,
		reset_rnd: reset_rnd,
		abs: abs,
		ceil: ceil,
		cos: cos,
		floor: floor,
		rnd255: rnd255,
		round: round,
		sin: sin,
		tan: tan
	};
}