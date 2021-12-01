import React from "react"
import classnames from 'classnames'

const Image_Size = {
    Small: 'w-16 h-16',
    Medium: 'w-32 h-32',
    Large: 'w-48 h-48'
}

function Image({ imagePath, size, rounded, className}) {
    return(
        <img src={imagePath} className={classnames(size, className, {'rounded-full': rounded}, 'border-4')} />
    )
}
export default Image;

Image.size = Image_Size;
