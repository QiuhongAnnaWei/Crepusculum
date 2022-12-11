import * as THREE from "three";
import { Mesh, BufferGeometry, Material, Vector3 } from 'three';
import React, { useRef, Suspense, forwardRef, useEffect, useState } from "react";
import { useFrame } from "react-three-fiber";
import { EffectComposer, GodRays } from "@react-three/postprocessing";
import { BlendFunction, Resizer, KernelSize } from "postprocessing";
// import "./styles.css";


// const Sun = forwardRef(function Sun(props, forwardRef) {
//   // useFrame(({ clock }) => {
//   //   forwardRef!.current.position.x = Math.sin(clock.getElapsedTime()) * -8;
//   //   forwardRef!.current.position.y = Math.cos(clock.getElapsedTime()) * -8;
//   // });
//   //  ref={forwardRef} 

//   function getPos(): Vector3{
//     return new Vector3(0,5,-15);
//   }
//   return (
//     <mesh position={getPos()}>
//       <sphereGeometry args={[1, 36, 36]} />
//       <meshBasicMaterial color={"#fcae79"} />
//     </mesh>
//   );
// });
 

// useFrame(({ clock }) => {
//   const a = clock.getElapsedTime();
//   if(sunRef.current){
//     sunRef.current!.position.x = Math.sin(a) * -8;
//     sunRef.current!.position.y = Math.cos(a) * -8;
//   }
//   // if (sunRef.current!.position.z+cellPosition.z > 10 || ref.current!.position.z+cellPosition.z < -10) {
//   //   // console.log(ref.current!.position.z);
//   //   sunRef.current!.visible=false;
//   // }
// });

  
// interface RaysProps{
//   sunRef: any
// }



function getPos(): Vector3{
  return new Vector3(0,5,-15);
}

export const Rays = () => {
  const sunRef = useRef<Mesh>(null);
  // const {sunRef} = props

  useEffect(() => {
    setDensity(0.95) // caused rerendering
  }, [sunRef.current]) // called when sunRef.current changes

  const [density, setDensity] = useState(0.96)

  return (
    <>
      {/* <Sun ref={sunRef} /> */}
      <mesh ref={sunRef!} position={[0,5,-15]}>
      <sphereGeometry args={[1, 36, 36]} />
      <meshBasicMaterial color={"#fcae79"} />
      </mesh>

      {sunRef.current && (
        <EffectComposer multisampling={0}>
          <GodRays
            sun={sunRef.current!}
            blendFunction={BlendFunction.SCREEN}
            samples={30}
            density={density}
            decay={0.9}
            weight={0.9}
            exposure={0.7}
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

// render(
//   <Canvas
//     style=
//     camera=
//     onCreated={({ gl }) => {
//       gl.setClearColor(new THREE.Color("#000000"));
//     }}
//   >
//     <pointLight position={[15, 15, 15]} intensity={1} />
//     <Suspense fallback={null}>
//       <Knot />
//     </Suspense>
//     <Effects />
//   </Canvas>,
//   document.querySelector("#root")
// );

