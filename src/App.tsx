import React, { Component, useEffect, useState } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { PlaneGeometry, Vector3 } from 'three';
import { BuildingBlocks, GrassCell } from './components';

const Ground = () => {
	return (
		<mesh
			rotation-x={-Math.PI / 2}>
			<planeGeometry args={[40, 20]} />
			<meshBasicMaterial color="grey" />
		</mesh>
	)
}

function App() {

	const [seed, setSeed]: [number, any] = useState(Date.now())

	const [positionArray, setPositionArray]: [Vector3[], any] = useState([])
	const [grassArray, setGrassArray]: [Vector3[], any] = useState([])

	const WORLD_ROW_COUNT = 10
	const WORLD_COL_COUNT = 20

	const generatePositions = () => {
		let tempPositionArray = [], tempGrassArray = []
		for (let row = -WORLD_ROW_COUNT; row < WORLD_ROW_COUNT; row++) {
			for (let col = -WORLD_COL_COUNT; col < WORLD_COL_COUNT; col++) {
				if (Math.random() > 0.4) {
					tempPositionArray.push(new Vector3(col, 0, row))
				} else {
					tempGrassArray.push(new Vector3(col, 0, row))
				}
			}
		}
		setPositionArray(tempPositionArray)
		setGrassArray(tempGrassArray)
	}

	useEffect(() => {
		generatePositions()
		console.log(positionArray)
	}, [])

	return (
		<div className="App">
			<Canvas>
				<OrbitControls />
				<ambientLight color="white" intensity={0.1} />
				<directionalLight color="white" position={[-100, 600, -100]} />
				<Ground />
				{positionArray.map((position) => {
					console.log(positionArray.length)
					return <BuildingBlocks
						buildingPosition={position}
						seed={seed}
					/>
				})}
				{grassArray.map((position) => {
					console.log(grassArray.length)
					return <GrassCell
						grassPosition={position} />
				})}
				<Sky />
			</Canvas>
		</div>
	);
}

export default App;
