import {useState} from "react";

function AddTask( {tasks, setTasks, setShowAddTask, type} ) {
    const [text, setText] = useState('')
    const [reminder, setReminder] = useState(false)

    // Add task
    const onAdd = (task) => {
        const id = Math.floor(Math.random() * 1000) + 1
        const newTask = { id, ...task };
        const newTasks = [...tasks, newTask]; // good // where the issue was - used curly braces instead of square brackets.
        // because tasks is an array of objects, not objects. [] for array, {} for object.
        setTasks(newTasks);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!text) {
            alert("What world do you live in where it's socially acceptable to add unnamed tasks?"); // creates a popup alert
            return;
        } else if (tasks.filter(t => t.text == text).length !== 0) {
            alert("No sane person would have multiple tasks with the same name.");
            return;
        }

        onAdd({text, reminder});

        setText('')
        setReminder(false);
        setShowAddTask(false);
    }

    return (
        <div>
            <form className='add-form'>
                <div className='form-control'>
                    <input type='text' id={`add-task-field-${type}`} placeholder={type==1 ? "Bucket" : "Task"} value={text} onChange={(e) => setText(e.target.value)}></input>
                </div>

                <div className=''>
                    <input type='submit' value='Add' className='btn theme' onClick={onSubmit} />
                    <button onClick={() => setShowAddTask(false)} className='btn regular'>Cancel</button>
                </div>
            </form>
        </div>
        
    )
}

export default AddTask
