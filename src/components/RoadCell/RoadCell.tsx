import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Vector3 } from 'three';
import { TextureLoader } from "three/src/loaders/TextureLoader";

interface RoadCellProps {
	roadPosition: Vector3
}

export const RoadCell = (props: RoadCellProps) => {
	const { roadPosition } = props

	const name = 
		(roadPosition.x % 7 === 0) ? (type: string) => `Road007_2K_${type}.png`
		: (type: string) => `Road007_2K_${type}_rotated.png`

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
	<group>
		<mesh
			position={[roadPosition.x, 0, roadPosition.z]}
			rotation-x={-Math.PI / 2}>
			<planeGeometry args={[1, 1]} />
			<meshStandardMaterial
				side = {THREE.FrontSide}
				displacementScale={0}
				map={colorMap}
				displacementMap={displacementMap}
				normalMap={normalMap}
				roughnessMap={roughnessMap}
			/>
		</mesh>
		<mesh
			position={[roadPosition.x, 0, roadPosition.z]}
			rotation-x={-Math.PI / 2}>
			<planeGeometry args={[1, 1]} />
			<meshStandardMaterial
				side = {THREE.BackSide}
				color={0x757373}
			/> 
		</mesh>
	</group>
	)
}