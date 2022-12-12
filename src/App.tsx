import { Button, ChakraProvider, Input } from '@chakra-ui/react';
import { OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { Vector3, Vector4 } from 'three';
import './App.css';
import { BuildingBlocks, Car, GrassCell, Loader, Rays, RoadCell, TimeSlider, Tree } from './components';
import { generateProceduralMaps } from './Procedural';

const WORLD_ROW_COUNT = 10
const WORLD_COL_COUNT = 40
const ROAD_ROW_FREQ = 4
const ROAD_COL_FREQ = 7
const PERLIN_FREQ = 8
const BUILDING_THRESHOLD = 0.2

function App() {
	const [buildingArray, setBuildingArray]: [Vector3[], any] = useState([])
	const [grassArray, setGrassArray]: [Vector3[], any] = useState([])
	const [roadArray, setRoadArray]: [Vector3[], any] = useState([])
	const [carArray, setCarArray]: [Vector4[], any] = useState([])
	const [time, setTime]: [number, any] = useState(0)

	// function that decides which block is building/grass
	const generateCity = () => {
		let tempBuildingArray = [], tempGrassArray = [], tempRoadArray = [], tempCarArray = []

		let proceduralMap: number[][] = new Array(WORLD_ROW_COUNT * 2 + 1);
		for (var i = 0; i < proceduralMap.length; i++) {
			proceduralMap[i] = new Array(WORLD_COL_COUNT * 2 + 1)
		}
		generateProceduralMaps(proceduralMap, PERLIN_FREQ);

		for (let row = -WORLD_ROW_COUNT; row <= WORLD_ROW_COUNT; row++) {
			for (let col = -WORLD_COL_COUNT; col <= WORLD_COL_COUNT; col++) {
				if (col % ROAD_COL_FREQ === 0 && Math.random() > 0.85) {
					tempCarArray.push(new Vector4(col, 0, row, Math.floor(Math.random() * 2)));
				}
				// generating roads in straight lines
				if (row % ROAD_ROW_FREQ === 0 || col % ROAD_COL_FREQ === 0) {
					tempRoadArray.push(new Vector3(col, 0, row))
				} else {
					// generate building
					if (proceduralMap[row + WORLD_ROW_COUNT][col + WORLD_COL_COUNT] > BUILDING_THRESHOLD) {
						tempBuildingArray.push(new Vector3(col, proceduralMap[row + WORLD_ROW_COUNT][col + WORLD_COL_COUNT], row))
					} else {
						// generate green space
						tempGrassArray.push(new Vector3(col, 0, row))
					}
				}
			}
		}
		setBuildingArray(tempBuildingArray)
		setGrassArray(tempGrassArray)
		setRoadArray(tempRoadArray)
		setCarArray(tempCarArray)
	}

	useEffect(() => {
		generateCity()
	}, [])


	// -- lighting functions ---
	const getLightParam = (currTime: number) => {
		// mapping 0 - 12 to 0 - 1, and 12 - 24 to 1 - 0
		// 0 is nighttime, 1 is daytime
		return 1 - Math.abs(currTime - 12) / 12
	}

	const getPos = (currentTime: any) => {
		// currentTime: [0, 24]
		const y = Math.abs(Math.cos(Math.PI / 24 * currentTime + Math.PI / 2)) * 25; // up
		const x = Math.sin(Math.PI / 24 * currentTime + 3 * Math.PI / 2) * 70; // long
		const z = Math.abs(Math.cos(Math.PI / 24 * currentTime + Math.PI / 2)) * 10; // short
		return new Vector3(x, y, z);
	}

	const getAzimuth = (currentTime: any) =>{
		// mapping 0 - 24 to 1 - 0.5
		return 1 - currentTime / 48;
	}


	return (
		<ChakraProvider>
			<Suspense fallback={<Loader />}>
				<div className="threejs-wrapper">
					<div className="heading-wrapper">
						<div className="heading">crepusculum</div>
						<div className="subtitle">a city generator</div>
					</div>
					<div className="control-panel">
						<div className="setting-individual">max height
							<Input placeholder='10' size='xs' width={50} marginLeft={2} />
						</div>
						<div className="setting-individual">min height
							<Input placeholder='2' size='xs' width={50} marginLeft={2} />
						</div>
						<Button variant="outline" size='xs' width="100%" marginTop={2}>
							generate
						</Button>
					</div>
					<div className="time-slider">
						<TimeSlider time={time} setTime={setTime} />
					</div>

					<div style={{ width: "100vw", height: "100vh" }}>
						<Canvas camera={{ fov: 80, position: [15, 6, 0] }}>
							<OrbitControls />
							<ambientLight color="white" intensity={0.4} />
							<directionalLight color="white" position={getPos(time)} intensity={getLightParam(time)} />
							{/* <directionalLight color="white" position={[50, 15, 50]} intensity={getLightParam(time)} /> */}
							{/* <Ground /> */}
							{buildingArray.map((position) => {
								return (
									<BuildingBlocks
										buildingPosition={position}
										normalizedHeight={position.y}
										time={time}
									/>
								)
							})}
							{grassArray.map((position) => {
								return (
									<>
										<GrassCell
											grassPosition={position} />
										<Tree
											treePosition={position} />
									</>
								)
							})}
							{roadArray.map((position) => {
								return (
									<RoadCell
										roadPosition={position} />
								)
							})}
							{carArray.map((position) => {
								return (
									<Car
										cellPosition={new Vector3(position.x, position.y, position.z)}
										moveDirection={position.w} />
								)
							})}
							<Sky distance={450000} inclination={getLightParam(time)} azimuth={getAzimuth(time)} rayleigh={1} turbidity={10}/>
							<Rays currentTime={time} />
						</Canvas>
					</div>
				</div>
			</Suspense>
		</ChakraProvider>
	);
}

export default App;
