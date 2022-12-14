import { useLoader } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";
import { Vector3 } from 'three';
import { TextureLoader } from "three/src/loaders/TextureLoader";

interface BuildingBlockProps {
	buildingPosition: Vector3
	normalizedHeight: number
	time: number
	quality: String
}

const minHeight = 1
const maxHeight = 20


export function BuildingBlocks(props: BuildingBlockProps) {

	const { buildingPosition, normalizedHeight, time, quality } = props

	const [randomTextureNumber]: [number, any] = useState(Math.random()); // use state so it doesn't always regenerate
	const [randomTextureState]: [number, any] = useState(Math.random());

	const actualHeight = normalizedHeight * (maxHeight - minHeight) + minHeight;

	// textures for building
	const texture_type = (actualHeight < 5)? Math.floor(randomTextureNumber * 2)+2 : Math.floor(randomTextureNumber * 2);

	
	const name =
		(texture_type === 0) ? 
			(((time > 6 && time < 18) || (time > 5 && time < 19 && randomTextureState < 0.4)) ? 
				(type: string) => `Facade006_${quality}_${type}.png` : (type: string) => `Facade009_${quality}_${type}.png`) :// 009
		(texture_type === 1) ? 
			(((time > 6 && time < 18) || (time > 5 && time < 19 && randomTextureState < 0.3)) ?
				(type: string) => `Facade001_${quality}_${type}.png` : (type: string) => `Facade003_${quality}_${type}.png`): // 003
		(texture_type === 2) ? 
			(((time > 6 && time < 18) || (time > 5 && time < 19 && randomTextureState < 0.6)) ?
				(type: string) => `Facade018A_${quality}_${type}.png`: (type: string) => `Facade018B_${quality}_${type}.png`)://018B
			(((time > 6 && time < 18) || (time > 5 && time < 19 && randomTextureState < 0.7)) ?
				(type: string) => `Facade020A_${quality}_${type}.png`: (type: string) => `Facade020B_${quality}_${type}.png`) //020B

	const [
		colorMap,
		displacementMap,
		normalMap,
		roughnessMap,
		metalMap
	] = useLoader(TextureLoader, [
		name("Color"),
		name("Displacement"),
		name("NormalDX"),
		name("Roughness"),
		name("Metalness")
	]);


	const repeatU = 0.7; const repeatV = actualHeight;

	colorMap.wrapS = THREE.RepeatWrapping;
	colorMap.wrapT = THREE.RepeatWrapping;
	colorMap.repeat.x = repeatU;
	colorMap.repeat.y = repeatV;
	displacementMap.wrapS = THREE.RepeatWrapping;
	displacementMap.wrapT = THREE.RepeatWrapping;
	displacementMap.repeat.x = repeatU;
	displacementMap.repeat.y = repeatV;
	normalMap.wrapS = THREE.RepeatWrapping;
	normalMap.wrapT = THREE.RepeatWrapping;
	normalMap.repeat.x = repeatU;
	normalMap.repeat.y = repeatV;
	roughnessMap.wrapS = THREE.RepeatWrapping;
	roughnessMap.wrapT = THREE.RepeatWrapping;
	roughnessMap.repeat.x = repeatU;
	roughnessMap.repeat.y = repeatV;
	metalMap.wrapS = THREE.RepeatWrapping;
	metalMap.wrapT = THREE.RepeatWrapping;
	metalMap.repeat.x = repeatU;
	metalMap.repeat.y = repeatV;
	

	// textures for base
	const name_base = (type: string) => `Asphalt019_1K_${type}.png`;

	const [
		colorMapBase,
		displacementMapBase,
		normalMapBase,
		roughnessMapBase,
	] = useLoader(TextureLoader, [
		name_base("Color"),
		name_base("Displacement"),
		name_base("NormalDX"),
		name_base("Roughness"),
	]);

	return (
		<group>
			<mesh position={[buildingPosition.x, actualHeight / 2 + 0.01, buildingPosition.z]}>
				<boxGeometry args={[0.7, actualHeight, 0.7]} />
				<meshStandardMaterial
					attach="material-0"
					displacementScale={0}
					map={colorMap}
					displacementMap={displacementMap}
					normalMap={normalMap}
					roughnessMap={roughnessMap}
					metalnessMap={metalMap}
				/>
				<meshStandardMaterial
					attach="material-1"
					displacementScale={0}
					map={colorMap}
					displacementMap={displacementMap}
					normalMap={normalMap}
					roughnessMap={roughnessMap}
					metalnessMap={metalMap}
				/>
				<meshStandardMaterial
					attach="material-2"
					color={0xffffff}
				/>
				<meshStandardMaterial
					attach="material-3"
					color={0xffffff}
				/>
				<meshStandardMaterial
					attach="material-4"
					displacementScale={0}
					map={colorMap}
					displacementMap={displacementMap}
					normalMap={normalMap}
					roughnessMap={roughnessMap}
					metalnessMap={metalMap}
				/>
				<meshStandardMaterial
					attach="material-5"
					displacementScale={0}
					map={colorMap}
					displacementMap={displacementMap}
					normalMap={normalMap}
					roughnessMap={roughnessMap}
					metalnessMap={metalMap}
				/>
			</mesh>
			<mesh
				position={[buildingPosition.x, 0.01, buildingPosition.z]}
			>
				<boxGeometry args={[1, 0.02, 1]} />
				<meshStandardMaterial
					displacementScale={0}
					map={colorMapBase}
					displacementMap={displacementMapBase}
					normalMap={normalMapBase}
					roughnessMap={roughnessMapBase}
				/>
			</mesh>
		</group>
	)
}