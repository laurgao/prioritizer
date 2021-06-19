import Tasks from "./Tasks";
import AddTask from "./AddTask";
import AddTaskButton from "./AddTaskButton";
import useKey from ".././utils/useKey";
import { useState } from "react";

const Stage = ({type, tasks, setTasks, showAdd, setShowAdd, stageName, toggleShowAdd}) => {
    
    const [showPriorities, setShowPriorities] = useState(false);

    useKey("Escape", () => (setShowAdd(false)) );

    return (
        <div className="mt-8">
            <div className="opacity-50 text-sm">
                <p><button 
                    className="font-semibold disabled:cursor-default" 
                    onClick={() => (setShowPriorities(true))}
                    disabled={showPriorities || type===2}
                >Stage {type}: {stageName ? `Specific tasks for ${stageName}` : "Buckets"}</button>{showPriorities && " (aka priorities)"}</p>
                {type===1 ? 
                    <>
                        <p>Following the <a className="underline theme-hover transition" href="https://www.samsonzhang.com/2021/01/20/the-rule-of-three.html" target="_blank" rel="noreferrer">Rule of Three</a>, you should have no more than three buckets at one time.</p> 
                        {tasks && tasks.length > 0 && <p className="my-2">Double click on a bucket for some magic!</p>} 
                    </>        
                : 
                    <>
                        <p>1. <span className="font-semibold">Write</span> specific tasks</p>
                        <p>2. <span className="font-semibold">Prioritize</span></p>
                        <p>3. <span className="font-semibold">Do</span> your tasks in order. Make sure to <a className="underline theme-hover transition" href="https://www.scotthyoung.com/blog/2020/05/04/do-the-real-thing/" target="_blank" rel="noreferrer">do the real thing</a> 😉</p>
                    </>
                }
            </div>
            <Tasks tasks={tasks} setTasks={setTasks}/>
            {!showAdd ? <AddTaskButton type={type} onAdd={toggleShowAdd}/> : <AddTask type={type} tasks={tasks} setTasks={setTasks} setShowAddTask={setShowAdd}/> }
        </div>
    )
}

export default Stage
