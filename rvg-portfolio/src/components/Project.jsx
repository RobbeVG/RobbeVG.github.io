import classnames from 'classnames'
import React, { useState, useRef } from 'react'
import { Transition } from '@headlessui/react'
import Image from './Image'

//TODO make Image.props

const styles = {
    flex: "flex flex-col gap-8",
    layout: " w-96 p-5 rounded-md",
    design: "bg-primary-600 hover:bg-primary-400 ",
    //TODO have fixed minimum value, remove line clamp shit
}

function Project({ className, title, tags, image, text }) {
    const [active, setActive] = useState(false)
    const paragraph = useRef();

    let itemList=[]
    if (tags != undefined){
        tags.forEach((item, index)=>{
            itemList.push( <li className={"inline mx-1"} key={index}>{item}</li>)
        }) 
    }

    console.log(image)
    // console.log(paragraph.current.style.lineHeight)

    return (
        <button 
        className={classnames(className, styles.flex, styles.layout, styles.design, {
            "bg-primary-200" : active
        })} 
        onClick={(event) => setActive(!active)}
        onBlur={(event) => {if(active){ setActive(false) }}} 
        >
            <div className={"flex gap-8"}>
                <Image imagePath={image} size={"medium"} border={{thickness: "medium", variant: "secondary"}}/>
                <div className={"grow flex flex-col justify-between text-white"}>
                    <h5 className={"self-center font-bold mt-4"}>
                        {title}
                    </h5>
                    <ul className={"mb-4"}>
                        {itemList}
                    </ul>
                </div>
            </div>
        
            <p ref={paragraph} className={classnames(
                //Transition
                "transition-all duration-500", 
                //Fading effect on text (200% length -> pos 0 = white to white, pos 100 = white to transparent)
                "bg-gradient-to-b bg-[length:200%_200%] from-white via-white to-transparent text-transparent bg-clip-text", {
                //We clamp text when not active + fade
                [`bg-[position:100%_100%] max-h-[100px]`] : !active,
                [`bg-[position:0%_0%] max-h-[480px]`] : active
            })}>
                {text}
            </p>
        </button>

    )
}
/*
            className={classnames(className, "group w-80 bg-background-400 hover:bg-background-200")}
            onClick={(event) => setActive(!active)}>
            <div className={"h-16"}>
                <Transition 
                    as={Fragment}
                    show={active}
                    enter="transition-height ease-linear duration-500"
                    enterFrom="h-16"
                    enterTo="h-40"
                    leave="transition-height ease-linear duration-500"
                    leaveFrom="h-40"
                    leaveTo="h-16"
                >
                    <div>

                   
Phasellus laoreet velit augue. Praesent nec sem mattis, facilisis leo eget, tempus lacus. Mauris scelerisque, nisi sit amet ultricies laoreet, velit tortor ultrices eros, non tristique velit nulla eu quam. Aliquam iaculis ut purus sit amet dictum. Nullam vitae sem neque. Sed pharetra ipsum a molestie venenatis. Pellentesque at aliquam nisl. Vestibulum nec est at quam commodo porttitor ac a libero. Quisque dictum nisi suscipit est accumsan, eget dapibus enim congue.

Maecenas vulputate est quis eros ornare ornare. Nunc efficitur aliquet odio. Donec pharetra nunc eu purus feugiat, ac fermentum ligula pulvinar. Nunc luctus elementum erat ac consectetur. Aenean neque elit, bibendum vitae mattis a, congue non neque. Aenean dignissim turpis ut sodales elementum. Vestibulum non aliquam est. Donec fringilla mi fermentum volutpat hendrerit. Donec lectus arcu, laoreet nec purus quis, porttitor porta enim. Integer eu purus porta, mattis sapien nec, dictum magna. Phasellus imperdiet, diam eget pellentesque rutrum, metus neque varius urna, tincidunt interdum dui urna quis enim. Nullam eget tellus efficitur, ullamcorper nulla ac, eleifend ligula. Mauris id massa at tortor eleifend posuere.

Sed vitae posuere ex. Nulla tempus tortor mauris, sit amet imperdiet nisl rutrum sit amet. Sed ante nulla, scelerisque id odio vel, laoreet placerat mauris. Sed rhoncus nunc et nisi sollicitudin, consectetur venenatis risus tempus. Mauris hendrerit felis sagittis nisl ullamcorper pharetra. Morbi lectus arcu, maximus sed aliquam non, sagittis in ante. Duis vel cursus risus. Ut nec lorem diam. In ac fermentum tortor, et commodo nisi. Praesent pretium, turpis a dapibus tincidunt, massa urna volutpat massa, id laoreet metus erat ac felis. Praesent pharetra malesuada justo ut fringilla. Suspendisse lobortis malesuada dolor iaculis cursus. Suspendisse interdum at tortor at pretium. Mauris eu faucibus lacus.

Praesent fermentum quis tellus sit amet laoreet. Mauris et erat auctor, semper nisl a, tempor urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum dictum erat a ullamcorper tempor. Donec ut sem nisl. Ut et risus lectus. Aenean eget libero a ante euismod dapibus a a erat. Duis dictum commodo lectus, a aliquet erat auctor vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque sit amet auctor lacus. 

                    </div>
                </Transition>
            </div>


            <img src={image} alt={image_alt} />
            {title}
            <ul>
                {itemList}
            </ul>


*/
export default Project;