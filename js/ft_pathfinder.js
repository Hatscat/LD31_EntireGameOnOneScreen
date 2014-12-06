
function r_gen_map_path_r(cell, dist)
{
	if (dist >= map_path[cell])
		return ;
	map_path[cell] = dist;
	if (cell % COLS < COLS)
		r_gen_map_path_r(cell + 1 , dist + 1);
	if (cell > COLS)
		r_gen_map_path_u(cell - COLS , dist + 1);
	if (cell < CELLS_NB - COLS)
		r_gen_map_path_d(cell + COLS , dist + 1);
}

function r_gen_map_path_l(cell, dist)
{
	if (dist >= map_path[cell])
		return ;
	map_path[cell] = dist;
	if (cell % COLS)
		r_gen_map_path_l(cell - 1 , dist + 1);
	if (cell > COLS)
		r_gen_map_path_u(cell - COLS , dist + 1);
	if (cell < CELLS_NB - COLS)
		r_gen_map_path_d(cell + COLS , dist + 1);
}

function r_gen_map_path_u(cell, dist)
{
	if (dist >= map_path[cell])
		return ;
	map_path[cell] = dist;
	if (cell % COLS)
		r_gen_map_path_l(cell - 1 , dist + 1);
	if (cell % COLS < COLS)
		r_gen_map_path_r(cell + 1 , dist + 1);
	if (cell > COLS)
		r_gen_map_path_u(cell - COLS , dist + 1);
}

function r_gen_map_path_d(cell, dist)
{
	if (dist >= map_path[cell])
		return ;
	map_path[cell] = dist;
	if (cell % COLS)
		r_gen_map_path_l(cell - 1 , dist + 1);
	if (cell % COLS < COLS)
		r_gen_map_path_r(cell + 1 , dist + 1);
	if (cell < CELLS_NB - COLS)
		r_gen_map_path_d(cell + COLS , dist + 1);
}

function gen_map_path(cell)
{
	for (var i = -1 ; ++i < CELLS_NB ;)
	{
		map_path[i] = CELLS_NB;
	}
	map_path[cell] = 0;
	if (cell % COLS)
		r_gen_map_path_l(cell - 1 , 1);
	if (cell % COLS < COLS)
		r_gen_map_path_r(cell + 1 , 1);
	if (cell > COLS)
		r_gen_map_path_u(cell - COLS , 1);
	if (cell < CELLS_NB - COLS)
		r_gen_map_path_d(cell + COLS , 1);
}