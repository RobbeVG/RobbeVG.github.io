import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

import PieceMaterial, { createCompatibleGeometry } from "./PieceMaterial"
import { node } from 'prop-types'

const path = (type) => `src/Assets/Models/Chess/Pieces/${type}`
const textureName = (type) => `${path("T_Cup_")}${type}`

function Cup(props) {
  const group = useRef()
  const { nodes } = useGLTF(path("Cup.glb"))
  const textures = useTexture({
    map: textureName("Color.jpg")
  })
  
  for (const [name, texture] of Object.entries(textures)) {
    texture.flipY = false;
    // console.log(`Set ${name}-texture flipY to ${texture.flipY}`);
  }

  nodes.Cup.geometry = createCompatibleGeometry(nodes.Cup.geometry)

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cup.geometry}
      >
        <PieceMaterial materialArgs={textures}/>
      </mesh>
    </group>
  )
}

useGLTF.preload(path("Cup.glb"))
useTexture.preload(textureName("Color.jpg"))

export default Cup