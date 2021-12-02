import React from 'react'
import NavBar from '../NavBar'

function Page(props) {
    return (
        //Background
        <div className='bg-gradient-to-b from-background-500 to-background-800'>
            <NavBar className='fixed'/>
            {props.children}
        </div>
    )
}

export default Page;