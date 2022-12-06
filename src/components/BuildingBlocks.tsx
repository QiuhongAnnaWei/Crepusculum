import React, { useState } from 'react';
import { PlaneGeometry, Vector3 } from 'three';

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

  return (
    <mesh
      position={[buildingPosition.x, height / 2, buildingPosition.z]}>
      <boxGeometry args={[0.7, height, 0.8]} />
      <meshStandardMaterial />
    </mesh>
  )
}

export default BuildingBlocks;