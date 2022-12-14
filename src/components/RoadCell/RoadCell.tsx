import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Vector3, Euler } from 'three';
import { TextureLoader } from "three/src/loaders/TextureLoader";

interface RoadCellProps {
	roadPosition: Vector3
	quality: String
}

export const RoadCell = (props: RoadCellProps) => {
	const { roadPosition, quality } = props

	const name = (type: string) => `Road007_${quality}_${type}.png`
	const rotation =
		(roadPosition.x % 7 === 0) ? new Euler(0, 0, 0) : new Euler(0, Math.PI / 2, 0)

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
	<group position={[roadPosition.x, 0, roadPosition.z]} rotation={rotation}>
		<mesh
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