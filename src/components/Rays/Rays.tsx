// https://onion2k.github.io/r3f-by-example/examples/effects/postprocessing-godrays/

import { Mesh, BufferGeometry, Material, Vector3 } from 'three';
import React, { useRef, Suspense, forwardRef, useEffect, useState } from "react";
// import {useFrame} from '@react-three/fiber'
import { EffectComposer, GodRays } from "@react-three/postprocessing";
import { BlendFunction, Resizer, KernelSize } from "postprocessing";

 

interface RaysProps{
  currentTime: any
}


export const Rays = (props: RaysProps) => {
  const sunRef = useRef<Mesh>(null);
  
  const {currentTime} = props

  // useFrame(({ clock }) => {
  //   // const a = clock.getElapsedTime();
  //   // const speed = 1;
  //   // const period = 2*Math.PI/speed; 
  //   // // 0-24 -> 0-period
  //   // const factor = period / 24;
  //   const a = 24;
  //   sunRef.current!.position.y = Math.abs(Math.cos(Math.PI/24*a + Math.PI/2)) * 25; // * -8;
  //   sunRef.current!.position.x = Math.sin(Math.PI/24*a+ 3*Math.PI/2) * 25;
  //   sunRef.current!.position.z = Math.abs(Math.cos(Math.PI/24*a + Math.PI/2)) * 10;
  // });

  function getPos(currentTime: any): Vector3{
    // currentTime: [0, 24]
    const y = Math.abs(Math.cos(Math.PI/24*currentTime + Math.PI/2)) * 25; // up

    const x = Math.sin(Math.PI/24*currentTime+ 3*Math.PI/2) * 25; // long
    const z = Math.abs(Math.cos(Math.PI/24*currentTime + Math.PI/2)) * 10; //short

    return new Vector3(x, y, z);
  }

  const [density, setDensity] = useState(0.96)
  const [exposure, setExposure] = useState(0.5) // 0.3-0.8


  
  useEffect(() => {
    setDensity(0.95) // caused rerendering
    setExposure(0.2+(1-Math.abs(currentTime-12)/12)*0.5) // 0.3-0.8
  }, [sunRef.current, currentTime]) // called when sunRef.current changes



  return (
    <>
      <mesh ref={sunRef!} position={getPos(currentTime)}>
      <sphereGeometry args={[1, 36, 36]} />
      <meshBasicMaterial color={"#f5efd0"} />
      </mesh>

      {sunRef.current && (
        <EffectComposer multisampling={0}>
          <GodRays
            sun={sunRef.current!}
            blendFunction={BlendFunction.SCREEN}
            samples={30}
            density={density}
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
