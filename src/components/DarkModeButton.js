import React from 'react'
import { FaMoon } from 'react-icons/fa'

function DarkModeButton( {onToggle} ) {
    return (
        <button className="btn theme dark-mode-toggle" onClick={onToggle}>
            <FaMoon />
        </button>
    )
}

export default DarkModeButton
