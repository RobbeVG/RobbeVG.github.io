import React from "react";
import classnames from 'classnames'
import PropTypes from 'prop-types'

function Header2({className, children}) {
    return(
            <h2 className={classnames(className, "text-3xl text-white font-bold")}>
                {children}
            </h2>
    )
}

Header2.propTypes = {
    children: PropTypes.string
}

export default Header2;