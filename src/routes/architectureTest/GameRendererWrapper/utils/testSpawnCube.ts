import * as THREE from 'three';

export function testSpawnCube(color: string, size?: [number, number, number]) {
	if (!size) {
		size = [1, 1, 1];
	}

	const material = new THREE.MeshBasicMaterial({
		color
	});

	const geometry = new THREE.BoxGeometry(...size);

	const mesh = new THREE.Mesh(geometry, material);

	return mesh;
}
