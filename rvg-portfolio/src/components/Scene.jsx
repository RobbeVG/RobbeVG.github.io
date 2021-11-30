import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import classnames from 'classnames'

//Models
import Box from './Models/Box'
import Chessboard from './Models/Chessboard'
import ChessboardWithMaterial from './Models/ChessboardWithMaterial'


function Scene({ className }) {
    return (
        <div className={classnames(className, 'relative')}>
            <Suspense fallback={null}>
                <Canvas camera={{ position: [0, 30, 25] }}>
                    <gridHelper />
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[-1.2, 2, 0]} />
                    <Box position={[1.2, 2, 0]} />
                    <Chessboard position={[-40, 0, 0]} rotation={[0, 0, 0]} />
                    <ChessboardWithMaterial position={[40, 0, 0]} />
                </Canvas>
            </Suspense>
        </div>
    )
}

export default Scene;