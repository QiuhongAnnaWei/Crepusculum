import { useRef } from "react";
import { Vector3, Group } from 'three';
import { useFrame } from '@react-three/fiber'

interface WheelProps{
  wheelPosition: Vector3
}

interface CarProps{
  cellPosition: Vector3
  moveDirection: number
}

const Wheel = (props: WheelProps) => {
  const {wheelPosition} = props;
  return(
    <mesh position={wheelPosition} rotation-z={Math.PI / 2}>
      <cylinderGeometry args={[0.05, 0.05, 0.07, 32]} />
      <meshStandardMaterial color={0x000000} />
    </mesh>
  )
}

export const Car = (props: CarProps) => {
  const ref = useRef<Group>(null);
  const {cellPosition, moveDirection} = props

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();

    if (moveDirection === 0){
      ref.current!.position.x = cellPosition.x + 0.2;
      ref.current!.position.z = (cellPosition.z-a/2) % 10;
    } 
    else if (moveDirection === 1){
      ref.current!.position.x = cellPosition.x - 0.2;
      ref.current!.position.z = (cellPosition.z+a/2) % 10;
    }
  });

  return(
    <group ref={ref}>
      <mesh position={[0, 0.2+0.1/2+0.1, 0]} >
        <boxGeometry args={[0.2, 0.1, 0.4]}/>
        <meshStandardMaterial color={0xee4010} />
      </mesh>
      <mesh position={[0, 0.2/2+0.1, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.6]}/>
        <meshStandardMaterial color={0xee4010} />
      </mesh>
      <Wheel wheelPosition={new Vector3(0.15, 0.05, 0.15)}/>
      <Wheel wheelPosition={new Vector3(-0.15, 0.05, 0.15)}/>
      <Wheel wheelPosition={new Vector3(0.15, 0.05, -0.15)}/>
      <Wheel wheelPosition={new Vector3(-0.15, 0.05, -0.15)}/>
    </group>
  )
}