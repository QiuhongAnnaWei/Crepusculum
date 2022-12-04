import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Canvas } from '@react-three/fiber';

function App() {
	return (
		<div className="App">
			<Canvas>
				<mesh>
					<ambientLight intensity={0.1} />
					<directionalLight color="red" position={[0, 0, 5]} />
					<boxGeometry args={[2, 2, 2]} />
					<meshStandardMaterial />
				</mesh>
			</Canvas>
			Somehow this is a red box
		</div>
	);
}

export default App;
