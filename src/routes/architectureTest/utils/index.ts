export function distance2d(a: [number, number], b: [number, number]) {
	const diff = [a[0] - b[0], a[1] - b[1]];

	return Math.sqrt(diff[0] * diff[0] + diff[1] * diff[1]);
}

export function lerpNumber(a: number, b: number, dt: number) {
	return (b - a) * dt + a;
}

export function lerpArr2(a: [number, number], b: [number, number], dt: number): [number, number] {
	return [lerpNumber(a[0], b[0], dt), lerpNumber(a[1], b[1], dt)];
}

export function lerpOverTime<T>(
	a: T,
	b: T,
	timeMs: number,
	lerp: (a: T, b: T, dt: number) => T,
	onUpdate: (v: T) => void
) {
	const start = Date.now();

	const interval = setInterval(() => {
		const dt = (Date.now() - start) / timeMs;

		if (dt >= 1) {
			onUpdate(b);
			clearInterval(interval);
			return;
		}

		onUpdate(lerp(a, b, dt));
	}, 1000 / 60);
}

export function testLerpOverTime() {
	lerpOverTime([1, 1], [2, 2], 100, lerpArr2, (upd) => {
		console.log(upd);
	});
}
