import { useLoader } from "@react-three/fiber";
import { useState } from "react";
// import { useEffect, useState } from 'react';
import * as THREE from "three";
import { Vector3 } from 'three';
import { TextureLoader } from "three/src/loaders/TextureLoader";

interface BuildingBlockProps {
	buildingPosition: Vector3
	normalizedHeight: number
}

const minHeight = 1
const maxHeight = 10

// const generateHeight = () => {
// 	return Math.random() * (maxHeight - minHeight) + minHeight
// }

export function BuildingBlocks(props: BuildingBlockProps) {

	const { buildingPosition, normalizedHeight } = props
	// const [height, setHeight]: [number, any] = useState(0);
	const [randomNumber, _]: [number, any] = useState(Math.random())

	// // generate building height on component load
	// useEffect(() => {
	// 	setHeight(generateHeight())
	// }, [])

	const actualHeight = normalizedHeight * (maxHeight - minHeight) + minHeight;

	// textures for building
	const texture_type = Math.floor(randomNumber * 3);

	const name =
		(texture_type === 0) ? (type: string) => `Facade006_2K_${type}.png` :
			(texture_type === 1) ? (type: string) => `Facade001_2K_${type}.png` :
				(type: string) => `Facade018A_2K_${type}.png`;

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

	// const ColorMaps = useTexture([name("Color"), name("Color"), name("Color"),name("Color"),name("Color"),name("Color")])
	// ColorMaps.map((texture, idx) => {
	//   texture.wrapS = THREE.RepeatWrapping;
	//   texture.wrapT = THREE.RepeatWrapping;
	//   texture.repeat.set(repeatU, repeatV);
	// })
	// const displacementMaps = useTexture([name("Displacement"),name("Displacement"),name("Displacement"),name("Displacement"),name("Displacement"),name("Displacement")])
	// const normalMaps = useTexture([ name("NormalDX"), name("NormalDX"), name("NormalDX"), name("NormalDX"), name("NormalDX"), name("NormalDX")])
	// const RoughnessMaps = useTexture([name("Roughness"),name("Roughness"),name("Roughness"),name("Roughness"),name("Roughness"),name("Roughness")])
	// const MetalnessMaps = useTexture([name("Metalness"),name("Metalness"),name("Metalness"),name("Metalness"),name("Metalness"),name("Metalness")])


	colorMap.wrapS = THREE.RepeatWrapping;
	colorMap.wrapT = THREE.RepeatWrapping;
	colorMap.repeat.set(repeatU, repeatV);
	displacementMap.wrapS = THREE.RepeatWrapping;
	displacementMap.wrapT = THREE.RepeatWrapping;
	displacementMap.repeat.set(repeatU, repeatV);
	normalMap.wrapS = THREE.RepeatWrapping;
	normalMap.wrapT = THREE.RepeatWrapping;
	normalMap.repeat.set(repeatU, repeatV);
	roughnessMap.wrapS = THREE.RepeatWrapping;
	roughnessMap.wrapT = THREE.RepeatWrapping;
	roughnessMap.repeat.set(repeatU, repeatV);
	metalMap.wrapS = THREE.RepeatWrapping;
	metalMap.wrapT = THREE.RepeatWrapping;
	metalMap.repeat.set(repeatU, repeatV);


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
		<>
			<mesh
				position={[buildingPosition.x, actualHeight / 2 + 0.01, buildingPosition.z]}>
				<boxGeometry args={[0.7, actualHeight, 0.7]} />
				<meshStandardMaterial
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
		</>
	)
}