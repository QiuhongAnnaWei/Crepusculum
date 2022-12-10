import React, { useState } from 'react';
import { PlaneGeometry, Vector3 } from 'three';
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

interface RoadCellProps {
	grassPosition: Vector3
}

export const RoadCell = (props: RoadCellProps) => {
	const { grassPosition } = props

	const name = (type: string) => `Asphalt019_1K_${type}.png`;

	const [
		colorMap,
		displacementMap,
		normalMap,
		roughnessMap,
	] = useLoader(TextureLoader, [
		name("Color"),
		name("Displacement"),
		name("NormalDX"),
		name("Roughness"),
	]);

	return (
		<mesh
			position={[grassPosition.x, 0, grassPosition.z]}
			rotation-x={-Math.PI / 2}>
			<planeGeometry args={[1, 1]} />
			<meshStandardMaterial
				displacementScale={0.1}
				map={colorMap}
				displacementMap={displacementMap}
				normalMap={normalMap}
				roughnessMap={roughnessMap}
			/>
		</mesh>
	)
}