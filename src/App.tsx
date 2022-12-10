import { OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { Vector3 } from 'three';
import './App.css';
import { BuildingBlocks, GrassCell, Ground, RoadCell } from './components';

const WORLD_ROW_COUNT = 10
const WORLD_COL_COUNT = 20

function App() {
	const [positionArray, setPositionArray]: [Vector3[], any] = useState([])
	const [grassArray, setGrassArray]: [Vector3[], any] = useState([])
	const [roadArray, setRoadArray]: [Vector3[], any] = useState([])

	// function that decides which block is building/grass
	const generateCity = () => {
		let tempPositionArray = [], tempGrassArray = [], tempRoadArray = []
		for (let row = -WORLD_ROW_COUNT; row < WORLD_ROW_COUNT; row++) {
			for (let col = -WORLD_COL_COUNT; col < WORLD_COL_COUNT; col++) {
				// generating roads in straight lines
				if (row % 4 === 0 || col % 7 === 0) {
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
					return (
						<BuildingBlocks
							buildingPosition={position}
						/>
					)
				})}
				{grassArray.map((position) => {
					return (
						<GrassCell
							grassPosition={position} />
					)
				})}
				{roadArray.map((position) => {
					return (
						<RoadCell
							grassPosition={position} />
					)
				})}
				<Sky />
			</Canvas>
		</div>
	);
}

export default App;
