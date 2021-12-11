import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

import "../Shaders/MouseWireframeShaderMaterial"
import PieceMaterial from '../Materials/PieceMaterial'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const { nodes } = useGLTF("src/Assets/Models/Fox.glb")
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.005))
  useFrame((state, delta) => (mesh.current.rotation.y += 0.002))
  // Return view, these are regular three.js elements expressed in JSX



  const vectors = [
    new THREE.Vector3( 0, 0, 1 ),
    new THREE.Vector3( 1, 0, 0 ),
    new THREE.Vector3( 0, 1, 0 )
  ];
  // const position = nodes.geometry_0_0.geometry.attributes.position;
  const position = nodes.fox.geometry.attributes.position;
  const centers = new Float32Array( position.count * 3 );
  
  for ( let i = 0; i < position.count; i++ ) {
    vectors[ i % 3 ].toArray( centers, i * 3  );
  }
  console.log(position.count)
  console.log(centers)
  // nodes.geometry_0_0.geometry.setAttribute( 'baryCentric', new THREE.BufferAttribute( centers, 3 ) );
  nodes.fox.geometry.setAttribute( 'baryCentric', new THREE.BufferAttribute( centers, 3 ) );

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 0.5 : 0.25}
      onClick={(event) => {setActive(!active); console.log(mesh.current.geometry)}}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      // geometry={nodes.geometry_0_0.geometry}
      geometry={nodes.fox.geometry}
    >
      <PieceMaterial />
      {/* <mouseWireframeShaderMaterial
      attach="material" 
      wireframeColorFront={0x20FBEB}
      wireframeColorBack={0x04CFC0} */}
      {/* /> */}

      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
    </mesh>
  )
}

useGLTF.preload("src/Assets/Models/Fox.glb")
export default Box