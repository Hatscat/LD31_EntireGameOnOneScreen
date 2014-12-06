/*
**
*/
function distance_2 (p_a, p_b) {

	var x = p_a.x - p_b.x;
	var y = p_a.y - p_b.y;
	return x*x + y*y;
}

/*
**
*/
function get_cells_around (p_origin_cell, p_col_nb, p_map_size) {

	return {
		left: p_origin_cell%p_col_nb ? p_origin_cell-1 : -1,
		right: (p_origin_cell+1)%p_col_nb ? p_origin_cell+1 : -1,
		up: p_origin_cell>p_col_nb ? p_origin_cell-p_col_nb : -1,
		down: p_origin_cell+p_col_nb<p_map_size ? p_origin_cell+p_col_nb : -1
	};
}

/*
**
*/
function check_walkables (p_map, p_obstacles_array) {

	var walkables = [];

	for (var i1 in p_map) {

		i1 = i1|0;

		if (p_obstacles_array.indexOf(i1) < 0) {
			walkables.push(i1);
		}
	}
	return walkables;
}

/*
**
*/
function find_path (p_game, p_origin, p_destination, p_walkables_array, p_ia_coef_array) {

	var path 			= [p_destination];
	var open_list 		= [p_origin];
	var locked_list 	= [];
	var costs_array 	= [];
	var col_nb 			= p_game.gd.column_nb;
	var map_size 		= p_game.gd.row_nb * col_nb;
	var ia_coef_array 	= p_ia_coef_array || [];
	var walkables_array = p_walkables_array.slice();

	if (walkables_array.indexOf(p_origin) < 0) {
		walkables_array.push(p_origin);
	}

	if (walkables_array.indexOf(p_destination) < 0) {
		walkables_array.push(p_destination);
	}

	while (locked_list.indexOf(p_destination) < 0) {

		var cheaper_value = Infinity;
		var closer_cell;

		for (var i1 in open_list) {

			var a = {x : open_list[i1] % col_nb, y : open_list[i1] / col_nb | 0};
			var b = {x : p_destination % col_nb, y : p_destination / col_nb | 0};

			costs_array[open_list[i1]] = distance_2(a, b) * (ia_coef_array[open_list[i1]] || 1) + 1;

			if (costs_array[open_list[i1]] < cheaper_value) {
				cheaper_value = costs_array[open_list[i1]];
				closer_cell = open_list[i1];
			}
		}

		locked_list.push(closer_cell);
		open_list.splice(open_list.indexOf(closer_cell), 1);

		var directions = get_cells_around(closer_cell, col_nb, map_size);

		for (var i1 in directions) {

			if (directions[i1]
			&&	walkables_array.indexOf(directions[i1]) > -1
			&&	locked_list.indexOf(directions[i1]) < 0
			&&	open_list.indexOf(directions[i1]) < 0) {

				open_list.push(directions[i1]);
			}
		}

		if (locked_list.length >= map_size) {
			console.log("PATHFINDER :", "pas de chemin possible");
			return null;
		}
	}

			//console.log("locked_list :", locked_list);
			//console.log("costs_array :", costs_array);

	while (path.indexOf(p_origin) < 0) {

		var current_cell 	= path[path.length - 1];
		var previous_cost 	= costs_array[current_cell];
		var directions 		= get_cells_around(current_cell, col_nb, map_size);
		var cheaper_value 	= Infinity;
		var next_cell;

		for (var i1 in directions) {

			if (directions[i1] > -1
			&&	locked_list.indexOf(directions[i1]) > -1
			&&	path.indexOf(directions[i1]) < 0) {

				if (costs_array[directions[i1]]
				&&	costs_array[directions[i1]] < cheaper_value
				&&	costs_array[directions[i1]] > previous_cost) {
					cheaper_value = costs_array[directions[i1]];
				}
				next_cell = directions[i1];
			}

		}

		path.push(next_cell);

		if (path.length >= map_size) {
			console.log("PATHFINDER :", "BUG!", path);
			return null;
		}
	}
	return path;
}
