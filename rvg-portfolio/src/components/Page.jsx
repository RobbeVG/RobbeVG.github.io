import React, { useRef, useState } from 'react'

function Page(props) {
    return (
        //Background
        <div className='bg-gradient-to-t from-gray-900 to-primary'>
            {props.children}
        </div>
    )
}

export default Page;