import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const path = (type) => `src/Assets/Models/Chessboard/${type}`

function ChessboardWithMaterial(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF(path("ChessWithMaterial.glb"))

    return (
      <group ref={group} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chessboard.geometry}
          material={materials["Material.001"]}
        >
        </mesh>
      </group>
    )
  }

useGLTF.preload(path("ChessWithMaterial.glb"))

export default ChessboardWithMaterial