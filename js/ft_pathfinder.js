
/*
function r_gen_map_path_r(cell, dist)
{
	if (dist >= map_path[cell] || map_statics[cell] != MAP_STATICS_I.empty)
		return ;
	map_path[cell] = dist;
	if (check_statics_collision(cell + 1, 1))
		r_gen_map_path_r(cell + 1 , dist + 1);
	if (check_statics_collision(cell - COLS, 2))
		r_gen_map_path_u(cell - COLS , dist + 1);
	if (check_statics_collision(cell + COLS, 3))
		r_gen_map_path_d(cell + COLS , dist + 1);
}

function r_gen_map_path_l(cell, dist)
{
	if (dist >= map_path[cell])
		return ;
	map_path[cell] = dist;
	if (check_statics_collision(cell - 1, 0))
		r_gen_map_path_l(cell - 1 , dist + 1);
	if (check_statics_collision(cell - COLS, 2))
		r_gen_map_path_u(cell - COLS , dist + 1);
	if (check_statics_collision(cell + COLS, 3))
		r_gen_map_path_d(cell + COLS , dist + 1);
}

function r_gen_map_path_u(cell, dist)
{
	if (dist >= map_path[cell])
		return ;
	map_path[cell] = dist;
	if (check_statics_collision(cell - 1, 0))
		r_gen_map_path_l(cell - 1 , dist + 1);
	if (check_statics_collision(cell + 1, 1))
		r_gen_map_path_r(cell + 1 , dist + 1);
	if (check_statics_collision(cell - COLS, 2))
		r_gen_map_path_u(cell - COLS , dist + 1);
}

function r_gen_map_path_d(cell, dist)
{
	if (dist >= map_path[cell])
		return ;
	map_path[cell] = dist;
	if (check_statics_collision(cell - 1, 0))
		r_gen_map_path_l(cell - 1 , dist + 1);
	if (check_statics_collision(cell + 1, 1))
		r_gen_map_path_r(cell + 1 , dist + 1);
	if (check_statics_collision(cell + COLS, 3))
		r_gen_map_path_d(cell + COLS , dist + 1);
}

function gen_map_path(cell)
{
	for (var i = -1 ; ++i < CELLS_NB ;)
	{
		map_path[i] = CELLS_NB;
	}
	map_path[cell] = 0;
	if (check_statics_collision(cell - 1, 0))
		r_gen_map_path_l(cell - 1 , 1);
	if (check_statics_collision(cell + 1, 1))
		r_gen_map_path_r(cell + 1 , 1);
	if (check_statics_collision(cell - COLS, 2))
		r_gen_map_path_u(cell - COLS , 1);
	if (check_statics_collision(cell + COLS, 3))
		r_gen_map_path_d(cell + COLS , 1);
}
*/

function r_gen_map_path_l(cell, dist)
{
	var xy = get_xy(cell);
	if (dist >= map_path[cell])
		return ;
	map_path[cell] = dist;
	if (xy[0] == 0)
	{
		if (map_statics[cell + COLS - 1] == MAP_STATICS_I.empty)
			r_gen_map_path_l(cell + COLS - 1 , dist + 1);
	}
	else
		if (map_statics[cell - 1] == MAP_STATICS_I.empty)
			r_gen_map_path_l(cell - 1 , dist + 1);
	if (xy[1] == 0)
	{
		if (map_statics[cell + COLS * (ROWS - 1)] == MAP_STATICS_I.empty)
			r_gen_map_path_u(cell + COLS * (ROWS - 1) , dist + 1);
	}
	else
		if (map_statics[cell - COLS] == MAP_STATICS_I.empty)
			r_gen_map_path_u(cell - COLS , dist + 1);
	if (xy[1] == ROWS - 1)
	{
		if (map_statics[cell % COLS] == MAP_STATICS_I.empty)
			r_gen_map_path_d(cell % COLS , dist + 1);
	}
	else
		if (map_statics[cell + COLS] == MAP_STATICS_I.empty)
			r_gen_map_path_d(cell + COLS , dist + 1);
}

function r_gen_map_path_r(cell, dist)
{
	var xy = get_xy(cell);
	if (dist >= map_path[cell])
		return ;
	map_path[cell] = dist;
	if (xy[0] == COLS - 1)
	{
		if (map_statics[cell - COLS + 1] == MAP_STATICS_I.empty)
			r_gen_map_path_r(cell - COLS + 1 , dist + 1);
	}
	else
		if (map_statics[cell + 1] == MAP_STATICS_I.empty)
			r_gen_map_path_r(cell + 1 , dist + 1);
	if (xy[1] == 0)
	{
		if (map_statics[cell + COLS * (ROWS - 1)] == MAP_STATICS_I.empty)
			r_gen_map_path_u(cell + COLS * (ROWS - 1) , dist + 1);
	}
	else
		if (map_statics[cell - COLS] == MAP_STATICS_I.empty)
			r_gen_map_path_u(cell - COLS , dist + 1);
	if (xy[1] == ROWS - 1)
	{
		if (map_statics[cell % COLS] == MAP_STATICS_I.empty)
			r_gen_map_path_d(cell % COLS , dist + 1);
	}
	else
		if (map_statics[cell + COLS] == MAP_STATICS_I.empty)
			r_gen_map_path_d(cell + COLS , dist + 1);
}

function r_gen_map_path_u(cell, dist)
{
	var xy = get_xy(cell);
	if (dist >= map_path[cell])
		return ;
	map_path[cell] = dist;
	if (xy[0] == 0)
	{
		if (map_statics[cell + COLS - 1] == MAP_STATICS_I.empty)
			r_gen_map_path_l(cell + COLS - 1 , dist + 1);
	}
	else
		if (map_statics[cell - 1] == MAP_STATICS_I.empty)
			r_gen_map_path_l(cell - 1 , dist + 1);
	if (xy[0] == COLS - 1)
	{
		if (map_statics[cell - COLS + 1] == MAP_STATICS_I.empty)
			r_gen_map_path_r(cell - COLS + 1 , dist + 1);
	}
	else
		if (map_statics[cell + 1] == MAP_STATICS_I.empty)
			r_gen_map_path_r(cell + 1 , dist + 1);
	if (xy[1] == 0)
	{
		if (map_statics[cell + COLS * (ROWS - 1)] == MAP_STATICS_I.empty)
			r_gen_map_path_u(cell + COLS * (ROWS - 1) , dist + 1);
	}
	else
		if (map_statics[cell - COLS] == MAP_STATICS_I.empty)
			r_gen_map_path_u(cell - COLS , dist + 1);
}

function r_gen_map_path_d(cell, dist)
{
	var xy = get_xy(cell);
	if (dist >= map_path[cell])
		return ;
	map_path[cell] = dist;
	if (xy[0] == 0)
	{
		if (map_statics[cell + COLS - 1] == MAP_STATICS_I.empty)
			r_gen_map_path_l(cell + COLS - 1 , dist + 1);
	}
	else
		if (map_statics[cell - 1] == MAP_STATICS_I.empty)
			r_gen_map_path_l(cell - 1 , dist + 1);
	if (xy[0] == COLS - 1)
	{
		if (map_statics[cell - COLS + 1] == MAP_STATICS_I.empty)
			r_gen_map_path_r(cell - COLS + 1 , dist + 1);
	}
	else
		if (map_statics[cell + 1] == MAP_STATICS_I.empty)
			r_gen_map_path_r(cell + 1 , dist + 1);
	if (xy[1] == ROWS - 1)
	{
		if (map_statics[cell % COLS] == MAP_STATICS_I.empty)
			r_gen_map_path_d(cell % COLS , dist + 1);
	}
	else
		if (map_statics[cell + COLS] == MAP_STATICS_I.empty)
			r_gen_map_path_d(cell + COLS , dist + 1);
}

function gen_map_path(cell)
{
	var xy = get_xy(cell);

	for (var i = -1 ; ++i < CELLS_NB ;)
	{
		map_path[i] = CELLS_NB;
	}
	map_path[cell] = 0;
	if (xy[0] == 0)
	{
		if (map_statics[cell + COLS - 1] == MAP_STATICS_I.empty)
			r_gen_map_path_l(cell + COLS - 1 , 1);
	}
	else
		if (map_statics[cell - 1] == MAP_STATICS_I.empty)
			r_gen_map_path_l(cell - 1 , 1);
	if (xy[0] == COLS - 1)
	{
		if (map_statics[cell - COLS + 1] == MAP_STATICS_I.empty)
			r_gen_map_path_r(cell - COLS + 1 , 1);
	}
	else
		if (map_statics[cell + 1] == MAP_STATICS_I.empty)
			r_gen_map_path_r(cell + 1 , 1);
	if (xy[1] == 0)
	{
		if (map_statics[cell + COLS * (ROWS - 1)] == MAP_STATICS_I.empty)
			r_gen_map_path_u(cell + COLS * (ROWS - 1) , 1);
	}
	else
		if (map_statics[cell - COLS] == MAP_STATICS_I.empty)
			r_gen_map_path_u(cell - COLS , 1);
	if (xy[1] == ROWS - 1)
	{
		if (map_statics[cell % COLS] == MAP_STATICS_I.empty)
			r_gen_map_path_d(cell % COLS , 1);
	}
	else
		if (map_statics[cell + COLS] == MAP_STATICS_I.empty)
			r_gen_map_path_d(cell + COLS , 1);
}