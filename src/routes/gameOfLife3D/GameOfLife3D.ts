export class GameOfLife3D {
	private cells: boolean[][][];

	private buffer: boolean[][][];

	shouldBorn = (n: number) => {
		return n >= 14 && n <= 19;
	};
	// shouldRemain = (n: number, state: boolean) => {
	// return n >= 9 && n <= 15;
	// };

	shouldKill = (n: number) => {
		return n < 13;
	};

	private cellsInitial: boolean[][][];

	constructor(
		public readonly sx: number,
		public readonly sy: number,
		public readonly sz: number
	) {
		this.cells = new Array(sx)
			.fill(0)
			.map(() => new Array(sy).fill(0).map(() => new Array(sz).fill(false)));

		this.cellsInitial = this.cells;

		this.buffer = new Array(sx)
			.fill(0)
			.map(() => new Array(sy).fill(0).map(() => new Array(sz).fill(false)));
	}

	public getCurrentArr() {
		return this.cells;
	}

	public fillRandom() {
		for (let ix = 0; ix < this.sx; ix++) {
			for (let iy = 0; iy < this.sy; iy++) {
				for (let iz = 0; iz < this.sz; iz++) {
					this.cells[ix][iy][iz] = Math.random() >= 0.5;
				}
			}
		}
	}

	public nextStep() {
		const arr = this.cells;
		const buffer = this.buffer;

		const countNeigbours = (_ix: number, _iy: number, _iz: number) => {
			let neighbours = 0;

			for (let ix = -1; ix <= 1; ix++) {
				for (let iy = -1; iy <= 1; iy++) {
					for (let iz = -1; iz <= 1; iz++) {
						if (ix === 0 && iy === 0 && iz === 0) {
							continue;
						}

						if (
							arr[(_ix + ix + this.sx) % this.sx][(_iy + iy + this.sy) % this.sy][
								(_iz + iz + this.sz) % this.sz
							]
						) {
							neighbours++;
						}
					}
				}
			}

			return neighbours;
		};

		for (let ix = 0; ix < this.sx; ix++) {
			for (let iy = 0; iy < this.sy; iy++) {
				for (let iz = 0; iz < this.sz; iz++) {
					const neighboursNum = countNeigbours(ix, iy, iz);

					const cell = arr[ix][iy][iz];

					buffer[ix][iy][iz] = cell;

					// if (cell) {
					// 	if (this.shouldKill(neighboursNum)) {
					// 		buffer[ix][iy][iz] = false;
					// 	}
					// } else {
					// if (this.shouldBorn(neighboursNum)) {
					// buffer[ix][iy][iz] = true;
					// }
					// }

					// if (this.shouldBorn(neighboursNum)) {
					// 	buffer[ix][iy][iz] = true;
					// } else if (this.shouldKill(neighboursNum)) {
					// 	buffer[ix][iy][iz] = false;
					// } else if (this.shouldRemain(neighboursNum)) {
					// 	buffer[ix][iy][iz] = arr[ix][iy][iz];
					// }
				}
			}
		}

		[this.cells, this.buffer] = [this.buffer, this.cells];
	}
}
