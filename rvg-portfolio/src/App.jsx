import React, { Suspense, useRef } from 'react'
import Scene from "./components/Page/Scene"
import Overlay from './components/Page/Overlay'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'

import Chessboard from './components/Models/Chessboard'
import Box from './components/Models/Box'

//Classnames should only be used for:
// the position property (folowed by)
// the top, bottom, left, right properties

function App() {  
  const overlay = useRef()
  const caption = useRef()
  const scroll = useRef(0)

  return (
    <div className='bg-gradient-to-b from-background-500 to-background-800'>
      <Scene overlay={overlay}/>
      <Overlay ref={overlay} caption={caption} scroll={scroll} />
    </div>
  )
}

export default App

/*
<header className="App-header">
        <p>Hello Vite + Reacts</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
*/