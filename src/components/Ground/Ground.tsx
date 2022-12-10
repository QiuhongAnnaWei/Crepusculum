import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export const Ground = () => {

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
			position={[0, -0.8, 0]}
			rotation-x={-Math.PI / 2}>
			<planeGeometry args={[42, 22]} />
			<meshStandardMaterial
				map={colorMap}
				displacementMap={displacementMap}
				normalMap={normalMap}
				roughnessMap={roughnessMap}
			/>
		</mesh>
	)
}