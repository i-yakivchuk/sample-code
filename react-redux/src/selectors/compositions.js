/**
 * Created by ivan on 11.02.18.
 */
export const getRowNumber = (total) => {
	if (total === 1 || total === 2) return 1;
	if (total >= 3 && total <= 8) return 2;
	if (total >= 9 && total <= 12) return 3;
	if (total >= 13 && total <= 28) return 4;
	if (total >= 29 && total <= 35) return 5;
	if (total >= 36 && total <= 48) return 6;
	if (total >= 49 && total <= 62) return 7;
};

export const getCompositionForGrid = (state) => {
	const { current } = state.user;
	let compositions = current.Compositions ? current.Compositions : [];

	if (!compositions.length)
		return [];

	//compositions = compositions.slice(0, 9);

	const rowNumber = getRowNumber(compositions.length);
	const colNumber = parseInt(compositions.length/rowNumber);
	let _tmpRow = [];
	let grid = [];

	compositions.map((item, index) => {
		if (_tmpRow.length !== colNumber && index !== (compositions.length - 1)) {
			_tmpRow.push(item);
		} else {
			_tmpRow.push(item);
			grid.push(_tmpRow);
			_tmpRow = []; //reset
		}
	});

	return grid || [];
};