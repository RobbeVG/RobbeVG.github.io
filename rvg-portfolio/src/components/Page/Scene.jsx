import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import classnames from 'classnames'

//Temp
import Fox from '../Models/Fox'
import ChessboardWithMaterial from '../Models/Chess/ChessboardWithMaterial'

//Models
import Chessboard from '../Models/Chess/Chessboard'
import Cup from '../Models/Chess/Pieces/Cup'
import Pacman from '../Models/Chess/Pieces/Pacman'
import AI from '../Models/Chess/Pieces/AI'

function Scene({ overlay, className }) {
    return (
        <div className={classnames(className, 'w-full h-screen')}>
            {/* anti-alliasing is set to true by default */}
            <Canvas 
                orthographic camera={{ zoom:15, position: [0, 10, 0] }}
                onCreated={(state) => {
                    state.events.connect(overlay.current); 
                }}
                raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}
            > 
                <gridHelper />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <Chessboard>
                        <group position={[0, 0.333333, 0]}>
                            <Cup position={[-19.25, 0, 13.75]}/>
                            <Cup position={[-13.75, 0, 13.75]}/>
                            <Cup position={[-8.25, 0, 13.75]}/>
                            <Cup position={[-2.75, 0, 13.75]}/>
                            <Cup position={[2.75, 0, 13.75]}/>
                            <Cup position={[8.25, 0, 13.75]}/>
                            <Cup position={[13.75, 0, 13.75]}/>
                            <Cup position={[19.25, 0, 13.75]}/>
                            <Pacman position={[13.75, 0, 19.25]}/>
                            <Pacman position={[-13.75, 0, 19.25]}/>
                            <AI position={[8.25, 0, 19.25]}/>
                            <AI position={[-8.25, 0, 19.25]} rotation={[0, Math.PI, 0]}/>
                        </group>
                        <group position={[0, 0.333333, 0]} rotation={[0, Math.PI, 0]}>
                            <Cup position={[-19.25, 0, 13.75]}/>
                            <Cup position={[-13.75, 0, 13.75]}/>
                            <Cup position={[-8.25, 0, 13.75]}/>
                            <Cup position={[-2.75, 0, 13.75]}/>
                            <Cup position={[2.75, 0, 13.75]}/>
                            <Cup position={[8.25, 0, 13.75]}/>
                            <Cup position={[13.75, 0, 13.75]}/>
                            <Cup position={[19.25, 0, 13.75]}/>
                            <Pacman position={[13.75, 0, 19.25]}/>
                            <Pacman position={[-13.75, 0, 19.25]}/>
                            <AI position={[8.25, 0, 19.25]}/>
                            <AI position={[-8.25, 0, 19.25]} rotation={[0, Math.PI, 0]}/>
                        </group>

                    </Chessboard>
                    {/* <Fox/> */}
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Scene;