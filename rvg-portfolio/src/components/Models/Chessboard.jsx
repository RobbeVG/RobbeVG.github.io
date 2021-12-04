import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three';

const path = (type) => `src/Assets/Models/Chessboard/${type}`
const textureName = (type) => `${path("T_Chessboard_")}${type}`


function Chessboard(props) {
    const group = useRef()
    const { nodes } = useGLTF(path("Chess.glb"))
    const textures = useTexture({
      map: textureName("Color.png"),
      temp: textureName("Color.png")
    })

    // Textures are 
    for (const [name, texture] of Object.entries(textures)) {
      texture.flipY = false;
      texture.magFiletr = THREE.LinearFilter
      // console.log(`Set ${name}-texture flipY to ${texture.flipY}`);
    }    
    // console.log(textures.map(texture => texture.flipY));

    return (
      <group ref={group} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chessboard.geometry}
        >
    	    <meshStandardMaterial {...textures} />
          
          {/* <meshNormalMaterial wireframe /> */}

        </mesh>
      </group>
    )
  }

useGLTF.preload(path("Chess.glb"))
useTexture.preload(textureName("Color.png"))

export default Chessboard