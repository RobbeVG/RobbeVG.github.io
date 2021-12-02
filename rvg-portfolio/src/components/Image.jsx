import React from "react"
import PropTypes from 'prop-types'
import classnames from 'classnames'

const styles = {
    base: "",
    border: {
        variant: {
            primary: '',
            secondary: ''
        },
        thickness: {
            small: "border-2", 
            medium: "border-4",
            large: "border-8"
        }
    },
    size: {
        small: 'w-16 h-16',
        medium: 'w-32 h-32',
        large: 'w-48 h-48'
    },
    rounded: 'rounded-full'
}

function Image({ className, imagePath, size, rounded, border}) {
    return(
        <img src={imagePath} className={classnames(className, 
            styles.base, styles.size[size], {[styles.rounded]: rounded},
            styles.border.thickness[border.thickness], styles.border.variant[border.variant]
            )} />
    )
}

Image.defaultProps = {
    size: "small",
    rounded: true,
    bordered: {}
}

Image.propTypes = {
    imagePath: PropTypes.string.isRequired,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    rounded: PropTypes.bool,
    bordered: PropTypes.oneOfType([
        PropTypes.exact({}), //Empty object
        PropTypes.shape({thickness: PropTypes.oneOf(["small", "medium", "large"])})
    ])
}

export default Image;
