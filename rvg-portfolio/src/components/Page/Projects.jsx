import React from "react";
import Project from "../Project";
import Header2 from "../Header2";
import classnames from 'classnames'

const ImagesSrcPath = (type) => `src/Assets/Images/Projects/${type}`

import Data from "../../Assets/Projects.json"


//overscroll-auto
function Projects({className}) {
    console.log(Data.projects[0].tags)
    return(
        <section className={classnames(className, 'flex flex-col gap-2 items-center')}>
            <Header2 className="my-4">Projects</Header2>
            <ul>
                {/* Mapping array of projects */}
                {Data.projects.map( (project, i) => (
                    <li key={i} className="mb-4 last:m-0">
                        <Project title={project.name} image={ImagesSrcPath(project.image)} tags={project.tags} text={project.description} />
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Projects;