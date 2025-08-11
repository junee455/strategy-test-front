export type MouseButtonName = 'left' | 'middle' | 'right';

let mousePosition = $state<[number, number] | undefined>();

let keysPressed = $state<Set<string>>(new Set());

let mouseButtonPressed = $state<MouseButtonName[]>([]);

const onMouseLeave = () => {
	mousePosition = undefined;
	keysPressed = new Set();
};

const onMouseMove = (ev: MouseEvent) => {
	mousePosition = [ev.offsetX, ev.offsetY];
	(ev.currentTarget as HTMLDivElement).focus();
};

const onMouseButtonDown = (ev: MouseEvent) => {
	ev.preventDefault();

	const buttonNames: MouseButtonName[] = ['left', 'right', 'middle'];

	mouseButtonPressed = buttonNames.filter((b, i) => ev.buttons & (1 << i));
};

const onMouseButtonUp = () => {
	mouseButtonPressed = [];
};

const onKeyDown = (ev: KeyboardEvent) => {
	ev.preventDefault();
	ev.stopPropagation();

	keysPressed.add(ev.code);

	keysPressed = new Set(keysPressed);
};

const onKeyUp = (ev: KeyboardEvent) => {
	keysPressed.delete(ev.code);

	keysPressed = new Set(keysPressed);
};

const getMouseButtonPressed = () => mouseButtonPressed;

const getMousePosition = () => mousePosition;

const getKeysPressed = () => keysPressed;

// mouse delta

export {
	onMouseButtonDown,
	onMouseButtonUp,
	onMouseLeave,
	onMouseMove,
	onKeyUp,
	onKeyDown,
	getMouseButtonPressed,
	getMousePosition,
	getKeysPressed
};
