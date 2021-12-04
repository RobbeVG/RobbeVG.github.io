import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import "../Shaders/Shader"

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
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

  
  // const position = mesh.current.geometry.attributes.position;
  // const centers = new Float32Array( position.count * 3 );

  // for ( let i = 0, l = position.count; i < l; i ++ ) {

  //   vectors[ i % 3 ].toArray( centers, i * 3 );

  // }

  // geometry.setAttribute( 'center', new THREE.BufferAttribute( centers, 3 ) );
  
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => {setActive(!active); console.log(refShader.current.mouseCoords)}}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      // material={new THREE.MeshBasicMaterial({
      //   color: 0x3fffff,
      //   wireframe: true
      // })}
    >
      <boxGeometry args={[60, 60, 60]} attach="geometry"/>
      
      <mouseWireframeShaderMaterial ref={refShader} attach="material" viewportSize={new THREE.Vector2(size.width, size.height)} wireframeLensSize={50.0}/>


 new THREE.Vector2(size.width, size.height);
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
    </mesh>
  )
}


export default Box