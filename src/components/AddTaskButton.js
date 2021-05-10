import React from 'react'
import { FaPlus } from 'react-icons/fa'

function AddTaskButton({onAdd}) {
    return (
        <div style={{display:'flex'}} className='btn-3' onClick={onAdd}>
            <FaPlus/>
            <p style={{marginLeft:'10px', marginTop:'-2px' }}>New (n)</p>
        </div>
    )
}

export default AddTaskButton
