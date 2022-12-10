import { useLoader } from "@react-three/fiber";
import { Vector3 } from 'three';
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
			position={[grassPosition.x, 0.01, grassPosition.z]}
			// rotation-x={-Math.PI / 2}
			>
			<boxGeometry args={[1, 0.02, 1]} />
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