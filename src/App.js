import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import AddTaskButton from './components/AddTaskButton'
import Footer from './components/Footer'
import DarkModeButton from './components/DarkModeButton'
import { useState, useEffect, useRef } from 'react'


const LOCAL_STORAGE_KEY = 'theUltimatePrioritizer.tasks'

// Putting quotes outside the function so the random only gets reloaded once, and the quote doesnt switch unless we reload.
const quotes = [
  'Most of us spend too much time on what is urgent and not enough time on what is important.',
  'A dream written down with a date becomes a goal. A goal broken down into steps becomes a plan. A plan backed by action makes your dreams come true.',
  'How you spend your time is who you become. - Aly Juma',
  "Discipline is choosing between what's painful right now vs what's the most painful.",
  "Amateurs show up whenever they feel like it. But being a professional means showing up when you don't want to.",
  "Procrastination is the inability to deal with emotional discomfort.",
  "Distractions are not caused by social media or by any outside factor. Distractions are caused by a desire from the inside to escape negative emotions — boredom, anxiety, stress, you name it. ",
  "Time management is pain management.",
  "Things which matter most must never be at the mercy of things which matter least."
]

const quoteIndex = Math.floor(Math.random() * quotes.length - 1) + 1 

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState( [] )
  const [darkMode, setDarmkMode] = useState(false)

  function useKey(key, cb) {
    const callbackRef = useRef(cb);

    useEffect(() => {
      callbackRef.current = cb;
    })

    useEffect(() => {
      const handleKeyPress = (e) => {
        if(e.code === key) {
          callbackRef.current(e)
        }
      }

      document.addEventListener("keypress", handleKeyPress)
      return () => document.removeEventListener("keypress", handleKeyPress)
    }, [key])
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) // json.parse converts the string into an array.
    if (storedTasks) setTasks(storedTasks)
  }, []) // because the empty array never changes, we only call this function once
  
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks]) // any time our list of tasks changes, we want to change our tasks

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarmkMode(!darkMode)
  }

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {
      ...task,
      reminder: !task.reminder,
    } : task))
  }

  // Add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1
    const newTask = { id, ...task}
    const newTasks = [...tasks, newTask] // where the issue was - used curly braces instead of square brackets.
    // because tasks is an array of objects, not objects. [] for array, {} for object.
    setTasks(newTasks)
  }

  // toggle upon clicking add
  const toggleShowAddTask = () => {
    setShowAddTask(!showAddTask)
  }

  function handleN() {
    if (!showAddTask) {
      toggleShowAddTask()
      const input = document.getElementById('task-field');
      input.focus();
      input.select();
    }
  }

  useKey("KeyN", handleN);
  
  return (
    <div className={darkMode && "theme-dark"}>
      <div className="App">
      <DarkModeButton onToggle={toggleDarkMode} />
        <div className="main">
          <Header quotes={quotes} quoteIndex={quoteIndex}/>
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} setTasks={setTasks}/>
          {!showAddTask && <AddTaskButton onAdd={toggleShowAddTask}/>}
          
          {showAddTask && <AddTask onAdd={addTask} hideAddTask={toggleShowAddTask}/>}
          <Footer />
        </div>
      </div>      
    </div>
  );
}


export default App;
