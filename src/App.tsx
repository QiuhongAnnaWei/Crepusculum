import React from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';

function App() {
	return (
		<div className="App">
			<Canvas>
				<OrbitControls/>
					<ambientLight color="white" intensity={0.1} />
					<directionalLight color="red" position={[0, 0, 5]} />
					<mesh>
						<boxGeometry args={[2, 2, 2]} />
						<meshBasicMaterial color="black" wireframe={true} />
					</mesh>
					<Sky/>
			</Canvas>
			{/* Somehow this is a red box */}
		</div>
	);
}

export default App;
