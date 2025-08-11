import type {
	IEngineTickContext,
	TEngineTickCallback
} from '../../gameOfLife3D/gameOfLifeVisualizer';
import * as THREE from 'three';

export function initTestFloor() {
	const geometry = new THREE.PlaneGeometry(10, 10, 1, 1);

	const checkerCellsAmount = 9;

	const meshMaterial = new THREE.ShaderMaterial({
		vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,

		fragmentShader: `
    varying vec2 vUv;

    void main() {
      float x1 = vUv.s;
      float x2 = vUv.t;

      int cellResolution = ${checkerCellsAmount};

      vec3 black = vec3(0.3, 0.3, 0.3);
      vec3 white = vec3(0.8, 0.8, 0.8);

      if(bool(int(x1 * float(cellResolution)) % 2)) {
        vec3 buff = black;
        black = white;
        white = buff;
      }
      
      if(bool(int(x2 * float(cellResolution)) % 2)) {
        gl_FragColor = vec4(black, 1.0);
      } else {
        gl_FragColor = vec4(white, 1.0);
      }
    }
    `
	});

	const mesh = new THREE.Mesh(geometry, meshMaterial);

	mesh.rotateX(THREE.MathUtils.degToRad(-90));
	mesh.rotateZ(THREE.MathUtils.degToRad(-30));

	const onTick: TEngineTickCallback = (c: IEngineTickContext) => {
		// mesh.rotateZ(c.deltaTime * 0.3);
	};

	return {
		onTick,
		mesh
	};
}
