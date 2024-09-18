import { Tiles } from './tiles';

export function exportLevel() {
	for (const filledBox of Tiles.filledBoxes) {
		console.log(filledBox);
	}
}