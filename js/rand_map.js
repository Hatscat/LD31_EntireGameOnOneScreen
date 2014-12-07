
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

function rand_map()
{
	for (var i = CELLS_NB; i--;)
	{
		map_statics[i] = MAP_STATICS_I.in_build;
	}
	r_rand_map(0);
	for (var i = CELLS_NB; i--;)
	{
		if (map_statics[i] == MAP_STATICS_I.in_build)
			r_rand_map(i);
	}
}