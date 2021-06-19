import React from 'react'
import { FaTimes } from 'react-icons/fa'

function Task( { task, onDelete, onToggle, provided } ) {

    return (
        <div 
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`task ${task.active && "border-theme border-l-4"}`} 
        onDoubleClick={() => onToggle(task.id)}
        >
            <p>{task.text} <FaTimes onClick={() => onDelete(task.id)} style={deleteStyle}/></p> 
        </div>
    )
}


const deleteStyle = {
    cursor: 'pointer',
    opacity: 0.7,
  }

export default Task
