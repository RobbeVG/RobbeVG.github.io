import React from "react";
import classnames from 'classnames'
import Header2 from "../Header2";

function AboutMe({className}) {
    return(
        <section className={classnames(className, 'w-screen h-screen text-center')}>
            <Header2 className="my-4">About Me</Header2>
        </section>
    )
}

export default AboutMe;