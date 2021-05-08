import propTypes from 'prop-types'

import React from 'react'

const Button = ({text, onClick}) => {
    return (
        <button 
        onClick={onClick} 
        className='btn theme' 
        >
            {text}
        </button>

    )
}

Button.propTypes = {
    text: propTypes.string,
    onClick: propTypes.func,
}

Button.defaultProps = {
    color: 'steelblue'
}

export default Button