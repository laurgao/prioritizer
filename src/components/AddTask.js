import React from 'react'
import {useState} from 'react'

function AddTask( {onAdd, hideAddTask} ) {
    const [text, setText] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text) {
            alert('Please add a task') // creates a popup alert
            return
        }

        onAdd({text, reminder})

        setText('')
        setReminder(false)

        hideAddTask(false)
    }

    return (
        <div>
            <form className='add-form'>
                <div className='form-control'>
                    <input id='task-field' type='text' placeholder='Task' value={text} onChange={(e) => setText(e.target.value)}></input>
                </div>

                <div className=''>
                    <input type='submit' value='Add' className='btn theme' onClick={onSubmit} />
                    <button onClick={() => hideAddTask(false)} className='btn regular'>Cancel</button>
                </div>
            </form>
        </div>
        
    )
}

export default AddTask
