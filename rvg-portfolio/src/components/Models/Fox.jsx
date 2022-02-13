import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// import "../Shaders/MouseWireframeShaderMaterial"
import PieceMaterial, { createCompatibleGeometry } from './Chess/Pieces/PieceMaterial'

function Fox(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const { nodes } = useGLTF("src/Assets/Models/Fox.glb")
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.005))
  useFrame((state, delta) => (mesh.current.rotation.y += 0.002))

  nodes.fox.geometry = createCompatibleGeometry(nodes.fox.geometry)

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 0.5 : 0.25}
      onClick={(event) => {setActive(!active); console.log(mesh.current.geometry)}}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      geometry={nodes.fox.geometry}
    >
      {/* Does not work but as example */}
      <PieceMaterial color={hovered ? new THREE.Color(0xd400ef) : new THREE.Color(0xd4efbb)}/> 
    </mesh>
  )
}

useGLTF.preload("src/Assets/Models/Fox.glb")
export default Fox