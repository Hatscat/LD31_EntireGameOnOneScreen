
function r_rand_map(cell)
{
	var xy = get_xy(cell);
	var posi = [];
	var mv;
	var count = 0;

	if (map_statics[cell] != MAP_STATICS_I.in_build)
		return ;
	map_statics[cell] = MAP_STATICS_I.empty;
	if (cell % COLS && map_statics[cell - 1] == MAP_STATICS_I.in_build)
		posi.push(cell - 1);
	if ((cell + 1) % COLS && map_statics[cell + 1] == MAP_STATICS_I.in_build)
		posi.push(cell + 1);
	if ((cell - COLS >= 0) && map_statics[cell - COLS] == MAP_STATICS_I.in_build)
		posi.push(cell - COLS);
	if ((cell + COLS < CELLS_NB) && map_statics[cell + COLS] == MAP_STATICS_I.in_build)
		posi.push(cell + COLS);
	if (posi.length)
	{
		mv = posi[(Math.random() * posi.length)|0];
		if (mv == cell - 1 || mv == cell  + 1)
		{
			if ((cell + COLS < CELLS_NB) && map_statics[cell + COLS] == MAP_STATICS_I.in_build)
				map_statics[cell + COLS] = MAP_STATICS_I.wall;
			if ((cell + COLS >= 0) && map_statics[cell - COLS] == MAP_STATICS_I.in_build)
				map_statics[cell - COLS] = MAP_STATICS_I.wall;
		}
		if (mv == cell - COLS || mv == cell  + COLS)
		{
			if ((cell + 1) % COLS && map_statics[cell + 1] == MAP_STATICS_I.in_build)
				map_statics[cell + 1] = MAP_STATICS_I.wall;
			if (cell % COLS && map_statics[cell - 1] == MAP_STATICS_I.in_build)
				map_statics[cell - 1] = MAP_STATICS_I.wall;
		}
		r_rand_map(mv);
		r_rand_map(cell);
		return ;
	}
	// dead end
	if (cell % COLS && map_statics[cell - 1] == MAP_STATICS_I.wall)
		posi.push(cell - 1);
	if ((cell + 1) % COLS && map_statics[cell + 1] == MAP_STATICS_I.wall)
		posi.push(cell + 1);
	if ((cell - COLS >= 0) && map_statics[cell - COLS] == MAP_STATICS_I.wall)
		posi.push(cell - COLS);
	if ((cell + COLS < CELLS_NB) && map_statics[cell + COLS] == MAP_STATICS_I.wall)
		posi.push(cell + COLS);

	if (cell % COLS && map_statics[cell - 1] == MAP_STATICS_I.empty)
		count += 1;
	if ((cell + 1) % COLS && map_statics[cell + 1] == MAP_STATICS_I.empty)
		count += 1;
	if ((cell - COLS >= 0) && map_statics[cell - COLS] == MAP_STATICS_I.empty)
		count += 1;
	if ((cell + COLS < CELLS_NB) && map_statics[cell + COLS] == MAP_STATICS_I.empty)
		count += 1;
	if (count < 2)
	{
		if (posi.length)
		{
			mv = posi[(Math.random() * posi.length)|0];
			map_statics[mv] = MAP_STATICS_I.empty;
		}
	}

}

function rand_map () {

	/*for (var i = CELLS_NB; i--;)
	{
		map_statics[i] = MAP_STATICS_I.in_build;
	}
	r_rand_map(0);
	for (var i = CELLS_NB; i--;)
	{
		if (map_statics[i] == MAP_STATICS_I.in_build)
			r_rand_map(i);
	}*/




	// quadrillage 
	for (var i = CELLS_NB; i--;) {

		var xy = get_xy(i);
		map_statics[i] = xy[0]%2 || xy[1]%2 ? MAP_STATICS_I.empty : MAP_STATICS_I.wall;
	}

	for (var i = 0; i<CELLS_NB/2; i+=(3+Math.random()*4|0)) {

		var xy = get_xy(i);
		var x = i%(COLS/2|0);
		var y = i/(COLS/2)|0

		if (!(x%2) || !(y%2)) {
			map_statics[x+y*COLS|0] = MAP_STATICS_I.wall;
			map_statics[COLS+(COLS%2)-x+y*COLS|0] = MAP_STATICS_I.wall;
		}
	}

	// 9 empty cells in center to mob spawner
	var center_cell = get_cell_from_xy([COLS/2|0,ROWS/2|0]);

	map_statics[center_cell-1] = MAP_STATICS_I.empty;
	map_statics[center_cell] = MAP_STATICS_I.empty;
	map_statics[center_cell+1] = MAP_STATICS_I.empty;
	map_statics[center_cell-COLS-1] = MAP_STATICS_I.empty;
	map_statics[center_cell-COLS] = MAP_STATICS_I.empty;
	map_statics[center_cell-COLS+1] = MAP_STATICS_I.empty;
	map_statics[center_cell+COLS-1] = MAP_STATICS_I.empty;
	map_statics[center_cell+COLS] = MAP_STATICS_I.empty;
	map_statics[center_cell+COLS+1] = MAP_STATICS_I.empty;

	// 9 empty cells in top left to player spawn

	var player_cell = COLS+1;

	map_statics[player_cell-1] = MAP_STATICS_I.empty;
	map_statics[player_cell] = MAP_STATICS_I.empty;
	map_statics[player_cell+1] = MAP_STATICS_I.empty;
	map_statics[player_cell-COLS-1] = MAP_STATICS_I.empty;
	map_statics[player_cell-COLS] = MAP_STATICS_I.empty;
	map_statics[player_cell-COLS+1] = MAP_STATICS_I.empty;
	map_statics[player_cell+COLS-1] = MAP_STATICS_I.empty;
	map_statics[player_cell+COLS] = MAP_STATICS_I.empty;
	map_statics[player_cell+COLS+1] = MAP_STATICS_I.empty;

	fill_collectibles();
}