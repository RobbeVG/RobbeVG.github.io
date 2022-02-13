import React, { forwardRef } from "react"

import Home from '../Page/Home'
import Projects from '../Page/Projects'
import AboutMe from '../Page/About Me'

const Overlay = forwardRef(({ caption, scroll }, ref) => (
  <div
    ref={ref}
    onScroll={(e) => {
      scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
      caption.current.innerText = scroll.current.toFixed(2)
      console.log("SCROOOL")
    }}
    className="fixed inset-0 overflow-y-auto w-screen overflow-x-hidden select-none"
    >
        {/* TODO DELETE */}
        <span className='fixed text-white' ref={caption}>0.00</span>
        
        <Home className='relative'/>
        <Projects className='relative'/>
        <AboutMe className='relative'/>
    </div>))

export default Overlay;