import React from 'react'
import { FaPlus } from 'react-icons/fa'

function AddTaskButton({onAdd}) {
    return (
        <div style={{display:'flex', opacity: 0.3}} className='btn-3' onClick={onAdd}>
            <FaPlus/>
            <p style={{marginLeft:'10px', marginTop:'-2px' }}>New (n)</p>
        </div>
    )
}

export default AddTaskButton
