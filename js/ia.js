
function is_key_down (key)
{
	for (var i=INPUT_KEYCODES_I[key].length; i--;)
		if (inputs[INPUT_KEYCODES_I[key][i]])
			return true;
	return false;
}

function is_in_sight(cell)
{
	return (0);
}

function update_archer(cell, mobile)
{
	var dist = map_path[cell];

	if (dist < 5 && is_in_sight(cell))
	{
		console.log("tsfiww");
	}
	else
	{
		if (cell % COLS && map_path[cell - 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - 1] = MAP_MOBILES_I.gobelin_left;
		}	
		if (cell % COLS < COLS && map_path[cell + 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + 1] = MAP_MOBILES_I.gobelin_right;
		}
		if (cell > COLS && map_path[cell - COLS] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - COLS] = MAP_MOBILES_I.gobelin_up;
		}
		if (cell < CELLS_NB - COLS && map_path[cell + COLS] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + COLS] = MAP_MOBILES_I.gobelin_down;
		}
	}
}

function update_golem(cell, mobile)
{
	update_gobelin(cell, mobile);
}

function update_gobelin(cell, mobile)
{
	var dist = map_path[cell];

	if (cell % COLS && map_path[cell - 1] < dist)
	{
		map_mobiles[cell] = 0;
		map_mobiles[cell - 1] = MAP_MOBILES_I.gobelin_left;
	}
	if (cell % COLS < COLS && map_path[cell + 1] < dist)
	{
		map_mobiles[cell] = 0;
		map_mobiles[cell + 1] = MAP_MOBILES_I.gobelin_right;
	}
	if (cell > COLS && map_path[cell - COLS] < dist)
	{
		map_mobiles[cell] = 0;
		map_mobiles[cell - COLS] = MAP_MOBILES_I.gobelin_up;
	}
	if (cell < CELLS_NB - COLS && map_path[cell + COLS] < dist)
	{
		map_mobiles[cell] = 0;
		map_mobiles[cell + COLS] = MAP_MOBILES_I.gobelin_down;
	}
	console.log("Yakata !");
}

function update_player(cell, mobile)
{
	gen_map_path(cell);
	/*
	INPUT_KEYCODES_I = {
		left: new Uint8Array([37, 81, 65]), // left arrow, q, a
		right: new Uint8Array([39, 68]), // right arrow, d
		up: new Uint8Array([38, 90, 87]), // up arrow, z, w
		down: new Uint8Array([40, 83]), // down arrow, s
		attack: new Uint8Array([32, 88, 67]) // space, x, c
	};
	*/
	if (is_key_down("left"))
		if (cell % COLS && !map_mobiles[cell - 1])
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - 1] = MAP_MOBILES_I.player_left;
		}
	if (is_key_down("right"))
		if (cell % COLS < COLS && !map_mobiles[cell + 1])
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + 1] = MAP_MOBILES_I.player_right;
		}
	if (is_key_down("up"))
		if (cell > COLS && !map_mobiles[cell - COLS])
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - COLS] = MAP_MOBILES_I.player_up;
		}
	if (is_key_down("down"))
		if (cell < CELLS_NB - COLS && !map_mobiles[cell + COLS])
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + COLS] = MAP_MOBILES_I.player_down;
		}
	if (is_key_down("attack"))
	{
		console.log("Echec critique, pliz do ALT-F4");
		map_mobiles[dtMath.rnd255()] = MAP_MOBILES_I.gobelin_up;
	}
}