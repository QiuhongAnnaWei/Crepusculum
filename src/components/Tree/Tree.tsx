// import * as THREE from "three";
import { Vector3 } from 'three';

interface TreeProps{
  treePosition: Vector3
}

export const Tree = (props: TreeProps) => {
  const {treePosition} = props

  const trunkHeight = 0.3
  const crownHeight = 0.8

  return(
    <>
      <mesh position={[treePosition.x, crownHeight/2+trunkHeight+0.01, treePosition.z]}>
        <cylinderGeometry args={[0, 0.2, crownHeight, 16]}/>
        <meshStandardMaterial color={0xa1cf74}/>
      </mesh>

      <mesh position={[treePosition.x, trunkHeight/2+0.01, treePosition.z]}>
        <cylinderGeometry args={[0.05, 0.05, trunkHeight, 16]}/>
        <meshStandardMaterial color={0x644211}/>
      </mesh>
    </>
  )
}