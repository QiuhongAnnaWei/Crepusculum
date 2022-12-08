import React, { useState } from 'react';
import { PlaneGeometry, Vector3 } from 'three';
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
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
  const name = (type : string) => `Facade006_2K_${type}.png`;

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
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.repeat.set(1,4);
  displacementMap.wrapS = THREE.RepeatWrapping;
  displacementMap.wrapT = THREE.RepeatWrapping;
  displacementMap.repeat.set(1,4);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(1,4);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(1,4);

  return (
    <mesh
      position={[buildingPosition.x, height / 2, buildingPosition.z]}>
      <boxGeometry args={[0.7, height, 0.8]} />
      <meshStandardMaterial
          displacementScale={0}
          map={colorMap}
          displacementMap={displacementMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
        />
    </mesh>
  )
}

export default BuildingBlocks;