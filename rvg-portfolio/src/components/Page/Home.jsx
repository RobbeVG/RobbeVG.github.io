import React from "react";
import NameParagraph from "../NameParagraph"
import Image from "../Image";
import Button from "../Button";
import classnames from 'classnames'

import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import myselfAvatar from "../../Assets/Images/RobbeVG.jpg"

//Home alignment is done in App.jsx
function Home({className}) {
    return(
        <section className={classnames(className, 'h-screen overflow-auto text-center')}> 
            <Image imagePath={myselfAvatar} size={Image.size.Large} rounded={true} className='mx-auto my-10'/>
            <h1 className='text-secondary text-5xl font-bold'>Robbe Van Gastel</h1>
            <NameParagraph />
            <div className='flex justify-evenly my-16'>
                <Button shape="square" size="small" roundness="xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </Button>
                <div></div>
                <Button shape="square" size="small" roundness="xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </Button>
            </div>
        </section>
    )
}

export default Home;