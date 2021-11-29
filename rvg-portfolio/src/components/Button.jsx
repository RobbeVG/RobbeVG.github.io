import React from 'react';
import PropTypes, { func } from 'prop-types'
import classnames from 'classnames'

const styles = {
    base: "whitespace-nowrap flex-inline focus:outline-none transition ease-in-out duration-300",
    padding: {
        rectangular: {
            small: "px-2 py-1",
            medium: "px-3 py-2",
            large: "px-4 py-2"
        },
        square: {
            small: "p-1",
            medium: "p-2",
            large: "p-4"
        }
    },
    variant: {
        primary: 'bg-blue-500 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900 hover:text-white',
    },
    roundness: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        pill: "rounded-full"
    },
    text:{
        light: "font-light",
        medium: "font-medium",
        bold: "font-bold"
    }
}

function Button({children, onClick, shape, size, variant, roundness, text, className}) {
    //Hover functionality in tailwind!
    const padding = ( function(){
        if (shape === "rectangular") {
            switch(size){
                case "small":
                    return styles.padding.rectangular.small;
                case "medium":
                    return styles.padding.rectangular.medium;
                case "large":
                    return styles.padding.rectangular.large;
            }
        }
        else if (shape === "square") {
            switch(size){
                case "small":
                    return styles.padding.square.small;
                case "medium":
                    return styles.padding.square.medium;
                case "large":
                    return styles.padding.square.large;
            }
        }
    }) () //Self invoking function

    return (
        <button 
            className={classnames(
                styles.base, padding, styles.variant[variant], 
                styles.roundness[roundness], styles.text[text], className
            )}
            onClick={onClick}
            >
            {children}
        </button>
    )
}

Button.defaultProps = {
    children: <>Button</>,
    shape: "rectangular",
    size: "small",
    variant: "primary",
    roundness: "none",
    text: "medium"
}

Button.PropTypes = {
    onClick: PropTypes.func,

    shape: PropTypes.oneOf(["rectangular", "square"]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    variant: PropTypes.oneOf(["primary", "secondary"]),
    roundness: PropTypes.oneOf(["none", "sm", "md", "lg", "xl", "pill"]),
    text: PropTypes.oneOf(["thin", "medium", "bold"]).isRequired,
}

export default Button;