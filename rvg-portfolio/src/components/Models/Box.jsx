import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

import * as THREE from 'three'

import "../Shaders/Shader"

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const { nodes } = useGLTF("src/Assets/Models/cube.glb")


  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.005))
  useFrame((state, delta) => (mesh.current.rotation.y += 0.002))
  // Return view, these are regular three.js elements expressed in JSX

  const refShader = useRef();
  const { size } = useThree()
  useFrame(({mouse}) => {
    //Mouse is mapped from [-1,1] but gets remapped to (size) in shader!
    refShader.current.mouseCoords = new THREE.Vector2(mouse.x, mouse.y);
  })

  // console.log(mesh.current.geometry) -> Does not work because not yet initialized!!!

  const vectors = [
    new THREE.Vector3( 1, 0, 0 ),
    new THREE.Vector3( 0, 1, 0 ),
    new THREE.Vector3( 0, 0, 1 )
  ];

  const position = nodes.geometry_0_0.geometry.attributes.position;
  const centers = new Float32Array( position.count * 3 );

  for ( let i = 0, l = position.count; i < l; i ++ ) {

    vectors[ i % 3 ].toArray( centers, i * 3 );

  }

  nodes.geometry_0_0.geometry.setAttribute( 'center', new THREE.BufferAttribute( centers, 3 ) );

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 25 : 10}
      onClick={(event) => {setActive(!active); console.log(mesh.current.geometry)}}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      geometry={nodes.geometry_0_0.geometry}
      // material={new THREE.MeshBasicMaterial({
      //   color: 0x3fffff,
      //   wireframe: true
      // })}
    >

      <mouseWireframeShaderMaterial ref={refShader} 
      attach="material" 
      viewportSize={new THREE.Vector2(size.width, size.height)} 
      wireframeLensSize={150.0}
      wireframeColor={0x3fffff}
      />

      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
    </mesh>
  )
}

useGLTF.preload("src/Assets/Models/cube.glb")
export default Box