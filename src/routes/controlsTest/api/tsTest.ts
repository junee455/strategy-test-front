export type CallbackFunction = (dt: number, value: number) => void;

export function initTest() {
	let value = 0;

	const callbacks: CallbackFunction[] = [];

	const engineState = {
		callbacks
	};

	setInterval(() => {
		value++;

		engineState.callbacks.forEach((f) => f(100, value));
	}, 100);

	return engineState;
}
