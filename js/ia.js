
function is_key_down (key)
{
	for (var i=INPUT_KEYCODES_I[key].length; i--;)
		if (inputs[INPUT_KEYCODES_I[key][i]])
			return true;
	return false;
}

function check_screen_collision(cell, dir)
{
	switch (dir)
	{
		case 0:
			if ((cell + 1) % COLS)
				return (1);
		break ;
		case 1:
			if ((cell) % COLS)
				return (1);
		break ;
		case 2:
			if (cell >= 0)
				return (1);
		break ;
		case 3:
			if (cell < CELLS_NB)
				return (1);
		break ;
	}
	return (0);
}

function check_statics_collision(cell, dir)
{
	if (!check_screen_collision(cell, dir))
		switch (dir)
		{
			case 0:
				cell += COLS;
			break ;
			case 1:
				cell -= COLS;
			break ;
			case 2:
				cell += COLS * (ROWS);
			break ;
			case 3:
				cell %= COLS;
			break ;
		}
	if (map_statics[cell] != MAP_STATICS_I.empty)
	{
		return (0);
	}
	return (1);
}

function update_player(cell, mobile)
{
	var res;

	gen_map_path(cell);
	if (is_key_down("left") && check_statics_collision(cell - 1, 0) && !map_mobiles[cell - 1])
	{
		map_mobiles[cell] = 0;
		if (!check_screen_collision(cell - 1, 0))
			map_mobiles[cell += COLS - 1] = MAP_MOBILES_I.player_left;
		else
			map_mobiles[(cell -= 1)] = MAP_MOBILES_I.player_left;
	}
	else if (is_key_down("right") && check_statics_collision(cell + 1, 1) && !map_mobiles[cell + 1])
	{
		map_mobiles[cell] = 0;
		if (!check_screen_collision(cell + 1, 1))
			map_mobiles[(cell -= COLS - 1)] = MAP_MOBILES_I.player_right;
		else
			map_mobiles[(cell += 1)] = MAP_MOBILES_I.player_right;
	}
	else if (is_key_down("up") && check_statics_collision(cell - COLS, 2) && !map_mobiles[cell - COLS])
	{
		map_mobiles[cell] = 0;
		if (!check_screen_collision(cell - COLS, 2))
			map_mobiles[(cell += COLS * (ROWS - 1))] = MAP_MOBILES_I.player_up;
		else
			map_mobiles[(cell -= COLS)] = MAP_MOBILES_I.player_up;
	}
	else if (is_key_down("down") && check_statics_collision(cell + COLS, 3) && !map_mobiles[cell + COLS])
	{
		map_mobiles[cell] = 0;
		if (!check_screen_collision(cell + COLS, 3))
			map_mobiles[cell %= COLS] = MAP_MOBILES_I.player_down;
		else
			map_mobiles[(cell += COLS)] = MAP_MOBILES_I.player_down;
	}/*
	else if ((res = move_dir(cell, mobile)) < 0)
	{
		res = -res;
		res = (res > 2 ? ((res - 3) * 2 - 1) * COLS : ((res - 1) * 2 - 1));
		cell += res;
	}*/

	if (map_collectibles[cell] != MAP_COLLECTIBLES_I.empty)
	{
		var pre_weapon = current_weapon;

		if (map_collectibles[cell] == MAP_COLLECTIBLES_I.trap)
		{
			current_hp -= 1;
			map_collectibles[cell] =  MAP_COLLECTIBLES_I.empty;
		}
		else if (map_collectibles[cell] != MAP_COLLECTIBLES_I.gold)
		{
			current_weapon = map_collectibles[cell];
			map_collectibles[cell] = pre_weapon;
		}
		else
		{
			++score;
			map_collectibles[cell] =  MAP_COLLECTIBLES_I.empty;
		}
		if (current_hp <= 0)
		{
			console.log("Player dead !!");
			map_mobiles[cell] = 0;
			return ;
		}
	}
	if (is_key_down("attack"))
	{
		switch (current_weapon)
		{
			case MAP_COLLECTIBLES_I.weapon_fire_ball:
				var dir = (mobile - 1) % 4 + 1;
				var mv = (dir > 2 ? ((dir - 3) * 2 - 1) * COLS : ((dir - 1) * 2 - 1));
				map_mobiles[cell + mv] = MAP_MOBILES_I["fire_ball_" + ["left", "right", "up", "down"][dir - 1]];
			break ;
			case MAP_COLLECTIBLES_I.weapon_sword:
				var dir = (mobile - 1) % 4 + 1;
				var mv = (dir > 2 ? ((dir - 3) * 2 - 1) * COLS : ((dir - 1) * 2 - 1));
				map_mobiles[cell + mv] = MAP_MOBILES_I["sword_" + ["left", "right", "up", "down"][dir - 1]];
			break ;
			case MAP_COLLECTIBLES_I.weapon_mace:
				var dir = (mobile - 1) % 4 + 1;
				var mv = (dir > 2 ? ((dir - 3) * 2 - 1) * COLS : ((dir - 1) * 2 - 1));
				map_mobiles[cell + mv] = MAP_MOBILES_I["mace_" + ["left", "right", "up", "down"][dir - 1]];
			break ;
			default :
				console.log("Echec critique, pliz do ALT-F4");
			break ;
		}

	}
}
/*
function move_dir(cell, mobile)
{
	var dir = (mobile - 1) % 4;

	switch (dir)
	{
		case 0: // left
			if (check_statics_collision(cell - 1, 0))
			{
				if (!map_mobiles[cell - 1])
				{
					map_mobiles[cell] = 0;
					map_mobiles[cell - 1] = mobile;
					return (-1);
				}
				else
					return (map_mobiles[cell - 1]);
			}
			return (0);
		break ;
		case 1: // right
			if (check_statics_collision(cell + 1, 1))
			{
				if (!map_mobiles[cell + 1])
				{
					map_mobiles[cell] = 0;
					map_mobiles[cell + 1] = mobile;
					return (-2);
				}
				else
					return (map_mobiles[cell + 1]);
			}
			return (0);
		break ;
		case 2: // up
			if (check_statics_collision(cell - COLS, 2))
			{
				if (!map_mobiles[cell - COLS])
				{
				map_mobiles[cell] = 0;
				map_mobiles[cell - COLS] = mobile;
					return (-3);
				}
				else
					return (map_mobiles[cell - COLS]);
			}
			return (0);
		break ;
		case 3: // down
			if (check_statics_collision(cell + COLS, 3))
			{
				if (!map_mobiles[cell + COLS])
				{
				map_mobiles[cell] = 0;
				map_mobiles[cell + COLS] = mobile;
					return (-4);
				}
				else
					return (map_mobiles[cell + COLS]);
			}
			return (0);
		break ;
	}
}
*/
function update_arrow(cell, mobile)
{
	move_dir(cell, mobile);
}

function update_fire_ball(cell, mobile)
{
	move_dir(cell, mobile);
}

function update_sword(cell, mobile)
{
	map_mobiles[cell] = 0;
}

function update_mace(cell, mobile)
{
	map_mobiles[cell] = 0;
}

function is_in_sight(cell, dist)
{

	if (check_statics_collision(cell - 1, 0) && map_path[cell - 1] < dist)
	{
		while (check_statics_collision(cell - 1, 0) && map_path[cell - 1] < dist)
			if (!map_path[--cell])
				return (1);

	}	
	else if (check_statics_collision(cell + 1 , 1) && map_path[cell + 1] < dist)
	{
		while (check_statics_collision(cell + 1, 1) && map_path[cell + 1] < dist)
			if (!map_path[++cell])
				return (2);
	}
	else if (check_statics_collision(cell - COLS, 2) && map_path[cell - COLS] < dist)
	{
		while (check_statics_collision(cell - COLS, 2) && map_path[cell - COLS] < dist)
			if (!map_path[(cell -= COLS)])
				return (3);
	}
	else if (check_statics_collision(cell - COLS, 3) && map_path[cell + COLS] < dist)
	{
		while (check_statics_collision(cell - COLS, 3) && map_path[cell + COLS] < dist)
			if (!map_path[(cell += COLS)])
				return (4);
	}
	return (0);
}

function update_archer(cell, mobile)
{
	var dist = map_path[cell];
	var dir;

	if (dist < 5 && (dir = is_in_sight(cell, dist)))
	{
		var mv = (dir > 2 ? ((dir - 3) * 2 - 1) * COLS : ((dir - 1) * 2 - 1));
		map_mobiles[cell + mv] = MAP_MOBILES_I["arrow_" + ["left", "right", "up", "down"][dir - 1]];
	}
	else
	{
	var dist = map_path[cell];
	var xy = get_xy(cell);
	
	if (xy[0] == 0 && map_statics[cell + COLS - 1] == MAP_STATICS_I.empty && map_path[cell + COLS - 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + COLS - 1] = MAP_MOBILES_I.archer_left;
		}
	else if (map_statics[cell - 1] == MAP_STATICS_I.empty && map_path[cell - 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - 1] = MAP_MOBILES_I.archer_left;
		}
	else if (xy[0] == COLS - 1 && map_statics[cell - COLS + 1] == MAP_STATICS_I.empty && map_path[cell - COLS + 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - COLS + 1] = MAP_MOBILES_I.archer_right;
		}
	else if (map_statics[cell + 1] == MAP_STATICS_I.empty && map_path[cell + 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + 1] = MAP_MOBILES_I.archer_right;
		}
	else if (xy[1] == 0 && map_statics[cell + COLS * (ROWS - 1)] == MAP_STATICS_I.empty && map_path[cell + COLS * (ROWS - 1)] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + COLS * (ROWS - 1)] = MAP_MOBILES_I.archer_up;
		}
	else if (map_statics[cell - COLS] == MAP_STATICS_I.empty && map_path[cell - COLS] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - COLS] = MAP_MOBILES_I.archer_up;
		}
	else if (xy[1] == ROWS - 1 && map_statics[cell % COLS] == MAP_STATICS_I.empty && map_path[cell % COLS] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell % COLS] = MAP_MOBILES_I.archer_down;
		}
	else if (map_statics[cell + COLS] == MAP_STATICS_I.empty && map_path[cell + COLS] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + COLS] = MAP_MOBILES_I.archer_down;
		}
	}
}

function update_golem(cell, mobile)
{
	var dist = map_path[cell];
	var xy = get_xy(cell);
	
	if (xy[0] == 0 && map_statics[cell + COLS - 1] == MAP_STATICS_I.empty && map_path[cell + COLS - 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + COLS - 1] = MAP_MOBILES_I.golem_left;
		}
	else if (map_statics[cell - 1] == MAP_STATICS_I.empty && map_path[cell - 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - 1] = MAP_MOBILES_I.golem_left;
		}
	else if (xy[0] == COLS - 1 && map_statics[cell - COLS + 1] == MAP_STATICS_I.empty && map_path[cell - COLS + 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - COLS + 1] = MAP_MOBILES_I.golem_right;
		}
	else if (map_statics[cell + 1] == MAP_STATICS_I.empty && map_path[cell + 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + 1] = MAP_MOBILES_I.golem_right;
		}
	else if (xy[1] == 0 && map_statics[cell + COLS * (ROWS - 1)] == MAP_STATICS_I.empty && map_path[cell + COLS * (ROWS - 1)] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + COLS * (ROWS - 1)] = MAP_MOBILES_I.golem_up;
		}
	else if (map_statics[cell - COLS] == MAP_STATICS_I.empty && map_path[cell - COLS] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - COLS] = MAP_MOBILES_I.golem_up;
		}
	else if (xy[1] == ROWS - 1 && map_statics[cell % COLS] == MAP_STATICS_I.empty && map_path[cell % COLS] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell % COLS] = MAP_MOBILES_I.golem_down;
		}
	else if (map_statics[cell + COLS] == MAP_STATICS_I.empty && map_path[cell + COLS] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + COLS] = MAP_MOBILES_I.golem_down;
		}
}

function update_gobelin(cell, mobile)
{
	var dist = map_path[cell];
	var xy = get_xy(cell);

	if (xy[0] == 0 && map_statics[cell + COLS - 1] == MAP_STATICS_I.empty && map_path[cell + COLS - 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + COLS - 1] = MAP_MOBILES_I.gobelin_left;
		}
	else if (map_statics[cell - 1] == MAP_STATICS_I.empty && map_path[cell - 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - 1] = MAP_MOBILES_I.gobelin_left;
		}
	else if (xy[0] == COLS - 1 && map_statics[cell - COLS + 1] == MAP_STATICS_I.empty && map_path[cell - COLS + 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - COLS + 1] = MAP_MOBILES_I.gobelin_right;
		}
	else if (map_statics[cell + 1] == MAP_STATICS_I.empty && map_path[cell + 1] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + 1] = MAP_MOBILES_I.gobelin_right;
		}
	else if (xy[1] == 0 && map_statics[cell + COLS * (ROWS - 1)] == MAP_STATICS_I.empty && map_path[cell + COLS * (ROWS - 1)] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + COLS * (ROWS - 1)] = MAP_MOBILES_I.gobelin_up;
		}
	else if (map_statics[cell - COLS] == MAP_STATICS_I.empty && map_path[cell - COLS] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell - COLS] = MAP_MOBILES_I.gobelin_up;
		}
	else if (xy[1] == ROWS - 1 && map_statics[cell % COLS] == MAP_STATICS_I.empty && map_path[cell % COLS] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell % COLS] = MAP_MOBILES_I.gobelin_down;
		}
	else if (map_statics[cell + COLS] == MAP_STATICS_I.empty && map_path[cell + COLS] < dist)
		{
			map_mobiles[cell] = 0;
			map_mobiles[cell + COLS] = MAP_MOBILES_I.gobelin_down;
		}
}