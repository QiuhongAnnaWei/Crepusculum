import { ChakraProvider, Checkbox, DarkMode, Input } from '@chakra-ui/react';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { Color, Vector3, Vector4 } from 'three';
import './App.css';
import { BuildingBlocks, Car, GrassCell, Loader, Rays, RoadCell, TimeSlider, Tree } from './components';
import { generateProceduralMaps } from './Procedural';

const WORLD_ROW_COUNT = 10
const WORLD_COL_COUNT = 40
const ROAD_ROW_FREQ = 4
const ROAD_COL_FREQ = 7
const PERLIN_FREQ = 16
const BUILDING_THRESHOLD = 0.2

function App() {
	const [buildingArray, setBuildingArray]: [Vector3[], any] = useState([])
	const [grassArray, setGrassArray]: [Vector3[], any] = useState([])
	const [roadArray, setRoadArray]: [Vector3[], any] = useState([])
	const [carArray, setCarArray]: [Vector4[], any] = useState([])
	const [time, setTime]: [number, any] = useState(0)
	const [showFloatingCity, setShowFloatingCity]: [boolean, any] = useState(false);
	const [isCyberCity, setIsCyberCity]: [boolean, any] = useState(true)
	const [checked2K, setChecked2K]: [boolean, any] = useState(false);
	const [minHeight, setMinHeight]: [number, any] = useState(1)
	const [maxHeight, setMaxHeight]: [number, any] = useState(15)
	const [isAnimated, setIsAnimated] = useState(false)

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
				} else if (row % ROAD_ROW_FREQ === 0 && Math.random() > 0.85) {
					tempCarArray.push(new Vector4(col, 0, row, Math.floor(2 + Math.random() * 2)));
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
		// const t = -12 + currentTime*2; // map 6-18 to 0-24
		const t = (currentTime - 5) * 24 / (19 - 5); // map 5-19 to 0-24
		const y = Math.abs(Math.cos(Math.PI / 24 * t + Math.PI / 2)) * 25; // up
		const x = Math.sin(Math.PI / 24 * t + 3 * Math.PI / 2) * 70; // long
		const z = Math.abs(Math.cos(Math.PI / 24 * t + Math.PI / 2)) * 10; // short
		return new Vector3(x, y, z);
	}

	const getAzimuth = (currentTime: any) => {
		// mapping 5-19 to 1-0.5
		return 1 - ((currentTime - 5) / (19 - 5) * 0.5);
	}

	const getColor = (currentTime: number) => {
		if (!isCyberCity){
			if (getLightParam(currentTime) > 0.7) {
				return new Color(1, 1, 1);
			}
			const r = 255 / 255;
			const g = (500 * getLightParam(currentTime) - 150) / 255;  // 101 - 200
			const b = 60 / 255;
			return new Color(r, g, b);
		} else {
			const r = getLightParam(currentTime);
			const g = 121 / 255;  // 101 - 200
			const b = 216 / 255;
			return new Color(r, g, b);
		}
		
	}

	const isSunUp = time > 5 && time < 19

	return (
		<ChakraProvider>
			<DarkMode>
				<Suspense fallback={<Loader />}>
					<div className="threejs-wrapper">
						<div className="heading-wrapper">
							<div className="heading">crepusculum</div>
							<div className="subtitle">a city generator</div>
						</div>
						<div className="control-panel">
							<Checkbox isChecked={showFloatingCity} onChange={() => setShowFloatingCity(!showFloatingCity)}>
								<div className="settings-text">floating city</div>
							</Checkbox>
							<Checkbox isChecked={isCyberCity} onChange={() => setIsCyberCity(!isCyberCity)}>
								<div className="settings-text">cyber city</div>
							</Checkbox>
							<Checkbox isChecked={checked2K} onChange={() => setChecked2K(!checked2K)}>
								<div className="settings-text">high-res</div>
							</Checkbox>
						</div>
						{!isAnimated && (<div className="generate-panel">
							<div className="setting-individual">min height
								<Input placeholder='1' size='xs' width={50} marginLeft={3} type="number" value={minHeight} onChange={(e) => setMinHeight(e.target.value)} />
							</div>
							<div className="setting-individual">max height
								<Input placeholder='15' size='xs' width={50} marginLeft={2} type="number" value={maxHeight} onChange={(e) => setMaxHeight(e.target.value)} />
							</div>
						</div>)}
						<div className="time-slider">
							<TimeSlider time={time} setTime={setTime} isAnimated={isAnimated} setIsAnimated={setIsAnimated} />
						</div>
						<div style={{ width: "100vw", height: "100vh" }}>
							<Canvas camera={{ fov: 80, position: [15, 6, 0] }}>
								<OrbitControls />
								<ambientLight color="white" intensity={0.4} />
								{buildingArray.map((position, idx) => {
									return (
										<BuildingBlocks
											key={idx}
											buildingPosition={position}
											normalizedHeight={position.y}
											time={time}
											quality={checked2K ? "2K" : "1K"}
											minHeight={minHeight}
											maxHeight={maxHeight}
										/>
									)
								})}
								{grassArray.map((position, idx) => {
									return (
										<GrassCell
											grassPosition={position}
											key={idx + 1000}
										/>
									)
								})}
								{grassArray.map((position, idx) => {
									return (
										<Tree
											treePosition={position}
											key={idx + 2000}
										/>
									)
								})}
								{!showFloatingCity && roadArray.map((position, idx) => {
									return (
										<RoadCell
											roadPosition={position}
											key={idx + 3000}
											quality={checked2K ? "2K" : "1K"}
										/>
									)
								})}
								{carArray.map((position, idx) => {
									return (
										<Car
											cellPosition={new Vector3(position.x, position.y, position.z)}
											moveDirection={position.w}
											key={idx + 4000}
										/>
									)
								})}
								<Rays currentTime={time} isShown={isSunUp} isCyber={isCyberCity} />
								{isSunUp ? (
									<>
										<directionalLight color={getColor(time)} position={getPos(time)} intensity={getLightParam(time)} />
										<Sky distance={4500000} inclination={getLightParam(time)} azimuth={getAzimuth(time)} rayleigh={1} turbidity={10} />
									</>
								) : (
									<Stars />
								)}
							</Canvas>
						</div>
					</div>
				</Suspense>
			</DarkMode>
		</ChakraProvider >
	);
}

export default App;
