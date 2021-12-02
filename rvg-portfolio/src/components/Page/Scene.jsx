import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import classnames from 'classnames'


//Models
import Chessboard from '../Models/Chessboard'
import ChessboardWithMaterial from '../Models/ChessboardWithMaterial'

function Scene({ className }) {
    return (
        <div className={classnames(className, 'w-screen h-screen')}>
            {/* anti-alliasing is set to true by default */}
            <Canvas orthographic camera={{ zoom:15, position: [0, 45, 35] }}> 
                {/* <OrthographicCamera makeDefault zoom={15} position={[0, 45, 35]}/> */}
                {/* <OrbitControls enablePan={true} enableRotate={true} /> */}
                <gridHelper />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                
                <Suspense fallback={null}>
                    <Chessboard position={[0, 0, 35]} rotation={[0, Math.PI/4, 0]} />
                </Suspense>
                {/* <ChessboardWithMaterial position={[0, 0, 30]} rotation={[0, Math.PI/4, 0]} /> */}
            </Canvas>
        </div>
    )
}

export default Scene;