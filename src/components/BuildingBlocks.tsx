import React, { useState } from 'react';
import { PlaneGeometry, Vector3 } from 'three';
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useTexture} from '@react-three/drei';
import * as THREE from "three";

interface BuildingBlockProps {
  buildingPosition: Vector3
  seed: number
}

const minHeight = 1
const maxHeight = 10

const generateHeight = () => {
  return Math.random() * (maxHeight - minHeight) + minHeight
}


function BuildingBlocks(props: BuildingBlockProps){
  
  const {buildingPosition, seed} = props
  const [height, setHeight]: [number, any] = useState(generateHeight());

  //textures
  const texture_type = Math.floor(Math.random() * 3);

  const name = 
    (texture_type === 0)? (type : string) => `Facade006_2K_${type}.png` :
    (texture_type === 1)? (type : string) => `Facade001_2K_${type}.png` :
    (type : string) => `Facade018A_2K_${type}.png`;

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

  const repeatU = 0.7; const repeatV = height;
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
  colorMap.repeat.set(repeatU,repeatV);
  displacementMap.wrapS = THREE.RepeatWrapping;
  displacementMap.wrapT = THREE.RepeatWrapping;
  displacementMap.repeat.set(repeatU,repeatV);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(repeatU,repeatV);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(repeatU,repeatV);
  metalMap.wrapS = THREE.RepeatWrapping;
  metalMap.wrapT = THREE.RepeatWrapping;
  metalMap.repeat.set(repeatU,repeatV);

  return (
    <mesh
      position={[buildingPosition.x, height / 2, buildingPosition.z]}>
      <boxGeometry args={[0.7, height, 0.7]} />
      {/* {ColorMaps.map((texture, idx) => (
        <meshStandardMaterial
          attach={`material-${idx}`}
          displacementScale={0}
          map={texture}
          displacementMap={displacementMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          metalnessMap={metalMap}
          key={texture.id}
        />
      ))} */}
      <meshStandardMaterial
          // key={texture.id}
          // attach={`material-${idx}`}
          displacementScale={0}
          map={colorMap}
          displacementMap={displacementMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          metalnessMap={metalMap}
      />
    </mesh>
  )
}

export default BuildingBlocks;