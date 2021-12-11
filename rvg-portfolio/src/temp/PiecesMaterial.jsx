import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
// import ExtendedMaterialPieces from './ExtendedShader';

function PiecesMaterial(geometry, textures) {
    const refShader = useRef();
    const { size } = useThree();

    const pieceMaterial = ExtendedMaterialPieces;
    pieceMaterial.uniforms.viewportSize = size;
    for (const [key, value] of Object.entries(textures)) {
        pieceMaterial.uniforms[key] = value;
    }

    console.log(pieceMaterial)

    //Mouse position update
    useFrame(({mouse}) => {

        if (refShader.current === undefined)
            return;
        //Mouse is mapped from [-1,1] but gets remapped to (size) in shader!
        refShader.current.mouseCoords = new THREE.Vector2(mouse.x, mouse.y);
    })

    //Add barycentric coordinates
    const vectors = [
        new THREE.Vector3( 1, 0, 0 ),
        new THREE.Vector3( 0, 1, 0 ),
        new THREE.Vector3( 0, 0, 1 )
    ];
    const position = geometry.attributes.position;
    const barycentrics = new Float32Array( position.count * 3 );
    for ( let i = 0; i < position.count; i ++ ) {
        vectors[ i % 3 ].toArray( barycentrics, i * 3 );
    }
    geometry.setAttribute( 'baryCentric', new THREE.BufferAttribute( barycentrics, 3 ) );

    
    return (pieceMaterial)
}

export default PiecesMaterial