// https://onion2k.github.io/r3f-by-example/examples/effects/postprocessing-godrays/

import { useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from 'three';
import { EffectComposer, GodRays } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";

interface RaysProps {
	currentTime: any
	isShown: boolean
	isCyber: boolean
}

export const Rays = (props: RaysProps) => {
	const { currentTime, isShown, isCyber } = props

	const sunRef = useRef<Mesh>(null);

	const [exposure, setExposure] = useState(0.5) // 0.3-0.8
	const [sunColor, setSunColor] = useState("rgb(255, 101, 60)") // 150-255

	const getLightParam = (currTime: number) => {
		// mapping 0 - 12 to 0 - 1, and 12 - 24 to 1 - 0
		// 0 is nighttime, 1 is daytime
		return 1 - Math.abs(currTime - 12) / 12
	}

	useEffect(() => {
		setExposure(0.2 + (1 - Math.abs(currentTime - 12) / 12) * 0.5) // 0.3 - 0.8
		const R = Math.round(255 * getLightParam(currentTime));
		const G = Math.round(500 * (1 - Math.abs(currentTime - 12) / 12) - 150);
		if (isCyber){
			setSunColor("rgb(" + R + " , 121, 216)")
		} else {
			setSunColor("rgb(255, " + G + ", 60)") // 160 - 255
		}
		// eslint-disable-next-line
	}, [sunRef.current, currentTime]) // called when sunRef.current changes

	function getPos(currentTime: any): Vector3 {
		// currentTime: [0, 24]
		// const t = -12 + currentTime*2; // map 6-18 to 0-24
		const t = (currentTime - 5) * 24 / (19 - 5); // map 5-19 to 0-24
		const y = Math.abs(Math.cos(Math.PI / 24 * t + Math.PI / 2)) * 25; // up
		const x = Math.sin(Math.PI / 24 * t + 3 * Math.PI / 2) * 70; // long
		const z = Math.abs(Math.cos(Math.PI / 24 * t + Math.PI / 2)) * 10; // short
		return new Vector3(x, y, z);
	}

	return (
		<>
			{isShown && (
				<mesh ref={sunRef!} position={getPos(currentTime)}>
					<sphereGeometry args={[1, 36, 36]} />
					<meshBasicMaterial color={sunColor} />
				</mesh>
			)}
			{sunRef.current && (
				<EffectComposer multisampling={0}>
					<GodRays
						sun={sunRef.current}
						blendFunction={BlendFunction.SCREEN}
						samples={30}
						density={0.96}
						decay={0.92}
						weight={0.9}
						exposure={exposure}
						clampMax={1}
						width={100}
						height={100}
						kernelSize={KernelSize.SMALL}
						blur={1}
					/>
				</EffectComposer>
			)}
		</>
	);
}
