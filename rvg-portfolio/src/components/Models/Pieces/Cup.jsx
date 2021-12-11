import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

import PieceMaterial from "../../Materials/PieceMaterial"

const path = (type) => `src/Assets/Models/Chessboard/Pieces/${type}`
const textureName = (type) => `${path("T_Cup_")}${type}`

function Cup(props) {
  const group = useRef()
  const { nodes } = useGLTF(path("Cup.glb"))
  const textures = useTexture({
    map: textureName("Color.jpg")
  })
  

  nodes.Cup.geometry = nodes.Cup.geometry.toNonIndexed();
  //barycentric coordinates don't keep track of index! -> TODO
  //Result: More memory usage...
  //Note: Only updating the barycentric coordinates to non indexed doesn't work..


  // Textures are 
  for (const [name, texture] of Object.entries(textures)) {
    texture.flipY = false;
    // console.log(`Set ${name}-texture flipY to ${texture.flipY}`);
  }

  const vectors = [
    new THREE.Vector3( 1, 0, 0 ),
    new THREE.Vector3( 0, 1, 0 ),
    new THREE.Vector3( 0, 0, 1 )
  ];

  const position = nodes.Cup.geometry.attributes.position;
  const barycentrics = new Float32Array( position.count * 3 );
  for ( let i = 0; i < position.count; i ++ ) {
      vectors[ i % 3 ].toArray( barycentrics, i * 3 );
  }
  nodes.Cup.geometry.setAttribute( 'baryCentric', new THREE.BufferAttribute( barycentrics, 3 ) );

  return (
    <group ref={group} {...props} dispose={null}>
      {/* <mesh>
        <boxGeometry/>
        <meshBasicMaterial/>
      </mesh> */}
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