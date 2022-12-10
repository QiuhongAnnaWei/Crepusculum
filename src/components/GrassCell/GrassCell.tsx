import React, { useState } from 'react';
import { PlaneGeometry, Vector3 } from 'three';
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

interface GrassCellProps {
	grassPosition: Vector3
}

export const GrassCell = (props: GrassCellProps) => {
	const { grassPosition } = props

	const name = (type: string) => `Grass004_1K_${type}.png`;

	const [
		colorMap,
		displacementMap,
		normalMap,
		roughnessMap,
		aoMap
	] = useLoader(TextureLoader, [
		name("Color"),
		name("Displacement"),
		name("NormalDX"),
		name("Roughness"),
		name("AmbientOcclusion")
	]);

	return (
		<mesh
			position={[grassPosition.x, 0, grassPosition.z]}
			rotation-x={-Math.PI / 2}>
			<planeGeometry args={[1, 1]} />
			<meshStandardMaterial
				displacementScale={0}
				map={colorMap}
				displacementMap={displacementMap}
				normalMap={normalMap}
				roughnessMap={roughnessMap}
				aoMap={aoMap}
			/>
		</mesh>
	)
}