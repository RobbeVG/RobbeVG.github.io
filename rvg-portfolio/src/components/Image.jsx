import React from "react"
import classnames from 'classnames'

const Image_Size = {
    Small: 'w-16 h-16',
    Medium: 'w-32 h-32',
    Large: 'w-64 h-64'
}

function Image({ imagePath, size, rounded, className}) {
    return(
        <div>
            <img src={imagePath} className={classnames(size, className, {'rounded-full': rounded})} />
        </div>
    )
}
export default Image;

Image.size = Image_Size;
