import React, { Component, useEffect, useState } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { PlaneGeometry, Vector3 } from 'three';
import { BuildingBlocks, GrassCell, Ground, RoadCell } from './components';

function App() {

	const [seed, setSeed]: [number, any] = useState(Date.now())

	const [positionArray, setPositionArray]: [Vector3[], any] = useState([])
	const [grassArray, setGrassArray]: [Vector3[], any] = useState([])
	const [roadArray, setRoadArray]: [Vector3[], any] = useState([])

	const WORLD_ROW_COUNT = 10
	const WORLD_COL_COUNT = 20

	// function that decides which block is building/grass
	const generateCity = () => {
		let tempPositionArray = [], tempGrassArray = [], tempRoadArray = []
		for (let row = -WORLD_ROW_COUNT; row < WORLD_ROW_COUNT; row++) {
			for (let col = -WORLD_COL_COUNT; col < WORLD_COL_COUNT; col++) {
				// generating roads in straight lines
				if (row % 4 == 0 || col % 7 == 0) {
					tempRoadArray.push(new Vector3(col, 0, row))
				} else {
					// generate building
					if (Math.random() > 0.4) {
						tempPositionArray.push(new Vector3(col, 0, row))
					} else {
						// generate green space
						tempGrassArray.push(new Vector3(col, 0, row))
					}
				}

			}
		}
		setPositionArray(tempPositionArray)
		setGrassArray(tempGrassArray)
		setRoadArray(tempRoadArray)
	}

	useEffect(() => {
		generateCity()
		console.log(positionArray)
	}, [])

	return (
		<div className="App">
			<Canvas>
				<OrbitControls />
				<ambientLight color="white" intensity={0.1} />
				<directionalLight color="white" position={[-50, 15, -50]} />
				<directionalLight color="white" position={[50, 15, 50]} />
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
				{roadArray.map((position) => {
					console.log(grassArray.length)
					return <RoadCell
						grassPosition={position} />
				})}
				<Sky />
			</Canvas>
		</div>
	);
}

export default App;
