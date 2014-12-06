
function is_key_down (key)
{
	for (var i=INPUT_KEYCODES_I[key].length; i--;)
		if (inputs[INPUT_KEYCODES_I[key][i]])
			return true;
	return false;
}

function move_dir(cell, mobile)
{
	var dir = (mobile - 1) % 4;

	switch (dir)
	{
		case 0: // left
			map_mobiles[cell] = 0;
			map_mobiles[cell - 1] = mobile;
		break ;
		case 1: // right
			map_mobiles[cell] = 0;
			map_mobiles[cell + 1] = mobile;
		break ;
		case 2: // up
			map_mobiles[cell] = 0;
			map_mobiles[cell + COLS] = mobile;
		break ;
		case 3: // down
			map_mobiles[cell] = 0;
			map_mobiles[cell - COLS] = mobile;
		break ;
	}
}

function update_arrow(cell, mobile)
{
	move_dir(cell, mobile);
}
function update_fire_ball(cell, mobile)
{
	move_dir(cell, mobile);
}

function is_in_sight(cell, dist)
{

	if (cell % COLS && map_path[cell - 1] < dist)
	{
		while (cell % COLS && map_path[cell - 1] < dist)
			if (!map_path[--cell])
				return (1);

	}	
	else if ((cell + 1) % COLS && map_path[cell + 1] < dist)
	{
		while ((cell + 1) % COLS && map_path[cell + 1] < dist)
			if (!map_path[++cell])
				return (2);
	}
	else if (cell > COLS && map_path[cell - COLS] < dist)
	{
		while (cell > COLS && map_path[cell - COLS] < dist)
			if (!map_path[(cell -= COLS)])
				return (4);
	}
	else if (cell < CELLS_NB - COLS && map_path[cell + COLS] < dist)
	{
		while (cell < CELLS_NB - COLS && map_path[cell + COLS] < dist)
			if (!map_path[(cell += COLS)])
				return (3);
	}
	return (0);
}

function update_archer(cell, mobile)
{
	var dist = map_path[cell];
	var dir;

	if (dist < 5 && (dir = is_in_sight(cell, dist)))
	{
		console.log("tsfiww" + dir);
		var mv = (dir > 2 ? ((dir - 3) * 2 - 1) * -COLS : ((dir - 1) * 2 - 1));
		map_mobiles[cell + mv] = MAP_MOBILES_I["arrow_" + ["left", "right", "up", "down"][dir - 1]];
	}
	else
	{
		if (cell % COLS && map_path[cell - 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - 1] = MAP_MOBILES_I.archer_left;
		}
		else if ((cell + 1) % COLS && map_path[cell + 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + 1] = MAP_MOBILES_I.archer_right;
		}
		else if (cell > COLS && map_path[cell - COLS] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - COLS] = MAP_MOBILES_I.archer_up;
		}
		else if (cell < CELLS_NB - COLS && map_path[cell + COLS] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + COLS] = MAP_MOBILES_I.archer_down;
		}
	}
}

function update_golem(cell, mobile)
{
	var dist = map_path[cell];

	if (cell % COLS && map_path[cell - 1] < dist)
	{
		map_mobiles[cell] = 0;
		map_mobiles[cell - 1] = MAP_MOBILES_I.golem_left;
	}
	else if ((cell + 1) % COLS && map_path[cell + 1] < dist)
	{
		map_mobiles[cell] = 0;
		map_mobiles[cell + 1] = MAP_MOBILES_I.golem_right;
	}
	else if (cell > COLS && map_path[cell - COLS] < dist)
	{
		map_mobiles[cell] = 0;
		map_mobiles[cell - COLS] = MAP_MOBILES_I.golem_up;
	}
	else if (cell < CELLS_NB - COLS && map_path[cell + COLS] < dist)
	{
		map_mobiles[cell] = 0;
		map_mobiles[cell + COLS] = MAP_MOBILES_I.golem_down;
	}
}

function update_gobelin(cell, mobile)
{
	var dist = map_path[cell];

	if (cell % COLS && map_path[cell - 1] < dist)
	{
		map_mobiles[cell] = 0;
		map_mobiles[cell - 1] = MAP_MOBILES_I.gobelin_left;
	}
	else if ((cell + 1) % COLS && map_path[cell + 1] < dist)
	{
		map_mobiles[cell] = 0;
		map_mobiles[cell + 1] = MAP_MOBILES_I.gobelin_right;
	}
	else if (cell > COLS && map_path[cell - COLS] < dist)
	{
		map_mobiles[cell] = 0;
		map_mobiles[cell - COLS] = MAP_MOBILES_I.gobelin_up;
	}
	else if (cell < CELLS_NB - COLS && map_path[cell + COLS] < dist)
	{
		map_mobiles[cell] = 0;
		map_mobiles[cell + COLS] = MAP_MOBILES_I.gobelin_down;
	}
	console.log("Yakata !");
}

function update_player(cell, mobile)
{
	gen_map_path(cell);
<<<<<<< HEAD
=======
	/*
	INPUT_KEYCODES_I = {
		left: new Uint8Array([37, 81, 65]), // left arrow, q, a
		right: new Uint8Array([39, 68]), // right arrow, d
		up: new Uint8Array([38, 90, 87]), // up arrow, z, w
		down: new Uint8Array([40, 83]), // down arrow, s
		attack: new Uint8Array([32, 88, 67]) // space, x, c
	};
	*/
>>>>>>> origin/master
	if (is_key_down("left") && cell % COLS && !map_mobiles[cell - 1])
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - 1] = MAP_MOBILES_I.player_left;
		}
	else if (is_key_down("right") && (cell + 1) % COLS && !map_mobiles[cell + 1])
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + 1] = MAP_MOBILES_I.player_right;
		}
	else if (is_key_down("up") && cell > COLS && !map_mobiles[cell - COLS])
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - COLS] = MAP_MOBILES_I.player_up;
		}
	else if (is_key_down("down") && cell < CELLS_NB - COLS && !map_mobiles[cell + COLS])
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + COLS] = MAP_MOBILES_I.player_down;
		}
	if (is_key_down("attack"))
	{
		console.log("Echec critique, pliz do ALT-F4");
		map_mobiles[dtMath.rnd255()] = MAP_MOBILES_I.archer_up;
		var dir = (mobile - 1) % 4 + 1;
		var mv = (dir > 2 ? ((dir - 3) * 2 - 1) * -COLS : ((dir - 1) * 2 - 1));
		map_mobiles[cell + mv] = MAP_MOBILES_I["fire_ball_" + ["left", "right", "up", "down"][dir - 1]];
	}
}