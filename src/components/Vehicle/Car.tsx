import { useEffect, useRef, useState } from "react";
import { Vector3, Group, Euler } from 'three';
import { useFrame } from '@react-three/fiber'

interface WheelProps{
  wheelPosition: Vector3
}

interface GlassProps{
  glassPosition: Vector3
  glassRotation: Euler
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

const Glass = (props: GlassProps) => {
  const {glassPosition, glassRotation} = props;

  return (
    <mesh position={glassPosition} rotation={glassRotation}>
      <boxGeometry args={[0.12, 0.08, 0.01]}/>
      <meshPhysicalMaterial roughness={0} metalness={0.1} reflectivity={0.8} opacity={0.5} color={0xa2d7f2}/>
    </mesh>
  )
}

export const Car = (props: CarProps) => {
  const ref = useRef<Group>(null);
  const {cellPosition, moveDirection} = props
  const [colorType, setColorType] = useState(0);

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
    else if (moveDirection === 2){
      ref.current!.position.z = cellPosition.z - 0.2;
      ref.current!.position.x = (cellPosition.x-a/2) % 40;
    } 
    else if (moveDirection === 3){
      ref.current!.position.z = cellPosition.z + 0.2;
      ref.current!.position.x = (cellPosition.x+a/2) % 40;
    } 
  });

  const rotation = 
    (moveDirection === 0 || moveDirection === 1)? new Euler(0,0,0) : new Euler(0, Math.PI / 2, 0);

  const color = 
    (colorType === 0)? 0xee4010 :
     (colorType === 1)? 0x225ae6 :0xa7abb5

  useEffect(()=>{
    setColorType(Math.floor(Math.random() * 3))
  }, [])

  return(
    <group ref={ref} rotation={rotation}>
      <mesh position={[0, 0.1/2+0.2+0.05, 0]} > 
        <boxGeometry args={[0.2, 0.15, 0.4]}/>
        <meshStandardMaterial color={color} roughness={0.415} metalness={0.557} />
      </mesh>
      <mesh position={[0, 0.2/2+0.05, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.6]}/>
        <meshStandardMaterial color={color} roughness={0.415} metalness={0.557}/>
      </mesh>
      <Glass glassPosition={new Vector3(0, 0.1/2+0.2+0.05, 0.4/2+0.01/2)} glassRotation={new Euler(0, 0, 0)}/>
      <Glass glassPosition={new Vector3(0, 0.1/2+0.2+0.05, -0.4/2-0.01/2)} glassRotation={new Euler(0, 0, 0)}/>
      <Glass glassPosition={new Vector3(0.2/2+0.01/2, 0.1/2+0.2+0.05, 0.4/4+0.01/2)} glassRotation={new Euler(0, Math.PI/2, 0)}/>
      <Glass glassPosition={new Vector3(0.2/2+0.01/2, 0.1/2+0.2+0.05, -0.4/4-0.01/2)} glassRotation={new Euler(0, Math.PI/2, 0)}/>
      <Glass glassPosition={new Vector3(-0.2/2-0.01/2, 0.1/2+0.2+0.05, 0.4/4+0.01/2)} glassRotation={new Euler(0, Math.PI/2, 0)}/>
      <Glass glassPosition={new Vector3(-0.2/2-0.01/2, 0.1/2+0.2+0.05, -0.4/4-0.01/2)} glassRotation={new Euler(0, Math.PI/2, 0)}/>
      <Wheel wheelPosition={new Vector3(0.15, 0.05, 0.15)}/>
      <Wheel wheelPosition={new Vector3(-0.15, 0.05, 0.15)}/>
      <Wheel wheelPosition={new Vector3(0.15, 0.05, -0.15)}/>
      <Wheel wheelPosition={new Vector3(-0.15, 0.05, -0.15)}/>
    </group>
  )
}