import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

import PieceMaterial, { createCompatibleGeometry } from "./PieceMaterial"

const path = (type) => `src/Assets/Models/Chess/Pieces/Knight/${type}`
const textureName = (type) => `${path("T_Pacman_")}${type}`

function Pacman(props) {
  const group = useRef()
  const { nodes } = useGLTF(path("Pacman.glb"))
  const textures = useTexture({
    map: textureName("Color.jpg")
  })
  
  for (const [name, texture] of Object.entries(textures)) {
    texture.flipY = false;
    // console.log(`Set ${name}-texture flipY to ${texture.flipY}`);
  }

  nodes.Pacman.geometry = createCompatibleGeometry(nodes.Pacman.geometry)

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Pacman.geometry}
      >
        <PieceMaterial materialArgs={textures}/>
      </mesh>
    </group>
  )
}

useGLTF.preload(path("Pacman.glb"))
useTexture.preload(textureName("Color.jpg"))

export default Pacman