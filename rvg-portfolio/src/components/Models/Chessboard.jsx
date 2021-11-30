import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Chessboard(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF('src/Assets/Models/Chess.glb')
    return (
      <group ref={group} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chessboard.geometry}
          material={materials['Material.001']}
        />
      </group>
    )
  }

useGLTF.preload('src/Assets/Models/Chess.glb')

export default Chessboard