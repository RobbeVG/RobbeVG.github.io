import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Box from './Box'

import classnames from 'classnames'

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {    // Update state so the next render will show the fallback UI.    
        return { hasError: true };  
    }
    componentDidCatch(error, errorInfo) {    // You can also log the error to an error reporting service   
        logErrorToMyService(error, errorInfo);  
    }
    render() {
        if (this.state.hasError) {      // You can render any custom fallback UI      
            return <h1>Something went wrong.</h1>;    
        }
        return this.props.children; 
    }
  }

function Scene({ className }) {
    const gltf = useLoader(GLTFLoader, 'src/Assets/Models/Chess.glb')

    return (
        <div className={classnames(className, 'relative')}>
            <ErrorBoundary>
            <Suspense fallback={null}>
                <Canvas camera={{ position: [0, 50, 3] }}>
                    <primitive object={gltf.scene} />
                    <gridHelper />
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} />
                </Canvas>
            </Suspense>
            </ErrorBoundary>
        </div>
    )
}

export default Scene;