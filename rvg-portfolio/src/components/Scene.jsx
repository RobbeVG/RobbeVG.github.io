import React, { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Box from './Box'

import classnames from 'classnames'

function Scene({ className }) {
    return (
        <div className={classnames(className, 'relative')}>
            <Canvas camera={{ position: [0, 2, 3] }}>
                <gridHelper />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
            </Canvas>
        </div>
    )
}

export default Scene;