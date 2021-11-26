import React from 'react'
import Scene from "./Components/Scene"
import Page from "./Components/Page"
import Home from './Components/Home/Home'

function App() {  
  return (
    <Page>
      <Home />
      <Scene className='h-screen z-10'/>
    </Page>
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