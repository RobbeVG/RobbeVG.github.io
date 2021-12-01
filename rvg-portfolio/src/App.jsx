import React from 'react'
import Scene from "./components/Scene"
import Page from "./components/Page/Page"
import Home from './components/Page/Home'
import Projects from './components/Page/Projects'
import AboutMe from './components/Page/About Me'

//Classnames should only be used for:
// the position property (folowed by)
// the top, bottom, left, right properties

function App() {  
  return (
    <Page>
      <Scene className='fixed'/>
      <Home className='relative'/>
      <Projects className='relative'/>
      <AboutMe className='relative'/>
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