import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

import * as THREE from 'three'

import "../Shaders/Shader"

function Piece(props) {
  // This reference will give us direct access to the mesh
  const refShader = useRef(); 
  const mesh = useRef()
  const { nodes } = useGLTF("src/Assets/Models/cube.glb")
  const { size } = useThree()

  useFrame(({mouse}) => {
    //Mouse is mapped from [-1,1] but gets remapped to (size) in shader!
    refShader.current.mouseCoords = new THREE.Vector2(mouse.x, mouse.y);
  })

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
      geometry={nodes.geometry_0_0.geometry}
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
export default Piece