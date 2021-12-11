import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import classnames from 'classnames'

//Temp
import Fox from '../Models/Fox'
import ChessboardWithMaterial from '../Models/Chess/ChessboardWithMaterial'

//Models
import Chessboard from '../Models/Chess/Chessboard'
import Cup from '../Models/Chess/Pieces/Cup'

function Scene({ overlay, className }) {
    return (
        <div className={classnames(className, 'w-full h-screen')}>
            {/* anti-alliasing is set to true by default */}
            <Canvas 
                orthographic camera={{ zoom:15, position: [0, 45, 35] }}
                onCreated={(state) => {
                    state.events.connect(overlay.current); 
                }}
                raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}
            > 
                <gridHelper />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <Chessboard position={[0, 0, 35]} rotation={[0, Math.PI/4, 0]} />
                    <Cup/>
                    <Fox/>
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Scene;