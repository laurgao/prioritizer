import Task from "./Task";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// we don't want to do this we want tasks to be part of our state
// should be familiar with map filter for each

import React from 'react'

function tasks( { tasks, setTasks } ) {

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTasks(items)
    }

    // Delete task
    const onDelete = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    // Toggle active
    const onToggle = (id) => {
        const changedTask = tasks.filter((task) => task.id === id)
        if (changedTask.active) {
            setTasks(tasks.map((task) => task.id === id ? {
                ...task,
                active: !task.active,
            } : task))
        } else { // Activate this task, all other tasks active is fale.
            setTasks(tasks.map((task) => task.id === id ? {
                ...task,
                active: !task.active,
            } : {
                ...task,
                active: false,
            }))
        }

        
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks-master">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="mt-4">
                        {tasks && tasks[0] && tasks.map((task, index) => ( 
                            // create a list of draggables
                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                {(provided) => (
                                    <Task provided={provided} task={task} onDelete={onDelete} onToggle={onToggle} />
                                )}
                            </Draggable>
                        ) )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default tasks
