import React from 'react'
import NavBar from '../NavBar'

function Page(props) {
    return (
        //Background
        <div className='bg-gradient-to-t from-gray-900 to-primary'>
            <NavBar className='fixed'/>
            {props.children}
        </div>
    )
}

export default Page;