import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

import PieceMaterial, { createCompatibleGeometry } from "./PieceMaterial"

const path = (type) => `src/Assets/Models/Chess/Pieces/Bishop/${type}`
const textureName = (type) => `${path("T_AI_")}${type}`

function AI(props) {
  const group = useRef()
  const { nodes } = useGLTF(path("AI.glb"))
  const textures = useTexture({
    map: textureName("Color.jpg")
  })
  
  for (const [name, texture] of Object.entries(textures)) {
    texture.flipY = false;
    // console.log(`Set ${name}-texture flipY to ${texture.flipY}`);
  }

  nodes.AI.geometry = createCompatibleGeometry(nodes.AI.geometry)

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.AI.geometry}
      >
        <PieceMaterial materialArgs={textures}/>
      </mesh>
    </group>
  )
}

useGLTF.preload(path("AI.glb"))
useTexture.preload(textureName("Color.jpg"))

export default AI