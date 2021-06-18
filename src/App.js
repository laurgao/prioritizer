import Header from "./components/Header";
import Footer from "./components/Footer";
import DarkModeButton from "./components/DarkModeButton";
import { useState, useEffect } from "react";
import AddStageButton from "./components/AddStageButton";
import Stage from "./components/Stage";
import useKey, {waitForEl} from "./utils/useKey";

const LOCAL_STORAGE_KEY = "theUltimatePrioritizer.tasks"
const LOCAL_STORAGE_KEY_THEME = "theUltimatePrioritizer.theme"

// Putting quotes outside the function so the random only gets reloaded once, and the quote doesnt switch unless we reload.
const quotes = [
  "Most of us spend too much time on what is urgent and not enough time on what is important.",
  "A dream written down with a date becomes a goal. A goal broken down into steps becomes a plan. A plan backed by action makes your dreams come true.",
  "How you spend your time is who you become. - Aly Juma",
  "Discipline is choosing between what's painful right now vs what's the most painful.",
  "Amateurs show up whenever they feel like it. But being a professional means showing up when you don't want to.",
  "Procrastination is the inability to deal with emotional discomfort.",
  "Distractions are not caused by social media or by any outside factor. Distractions are caused by a desire from the inside to escape negative emotions — boredom, anxiety, stress, you name it. ",
  "Time management is pain management.",
  "Things which matter most must never be at the mercy of things which matter least.",
  "No one cares about what you're bad at and neither should you.  - Derek Sivers"
]

const quoteIndex = Math.floor(Math.random() * quotes.length - 1) + 1 // Random quote
function App() {
  const [showAddBucket, setShowAddBucket] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  useEffect(() => {
    setShowAdd(showAddBucket || showAddTask)
  }, [showAddBucket, showAddTask])

  const setBuckets = (buckets) => {
    setStages([{
        ...stages[0],
        tasks: buckets
      }, 
      ...stages.filter(s => s.type == 2)
    ])
  }
  const [stages, setStages] = useState([{
    name: "buckets",
    active: true,
    tasks: [],
    type: 1
  }]);

  useEffect(() => {
    const storedStages = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedStages && storedStages[0].name) {
      setStages(storedStages);
      console.log(storedStages, stages);
    } //  else set tasks to stored tasks
  }, [])
  
  const [darkMode1, setDarkMode1] = useState(false);
  
  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_THEME)); 
    if (storedDarkMode) setDarkMode1(storedDarkMode);
  }, [])
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stages));
  }, [stages]) 

  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_THEME, JSON.stringify(darkMode1))
  }, [darkMode1]) 

  // Toggle dark mode
  const toggleDarkMode = (e) => {
    if (e instanceof KeyboardEvent){
      // it is a keyboard event
      if (showAdd) return;
    }
    setDarkMode1(!darkMode1);
  }
  console.log(stages)

  // The active childstage is theo ne which parent task is active.
  useEffect(() => {
    //const childStage = stages.filter(s => s.name == tasks.filter(task => task.id == id)[0].text)[0];
    if(stages.filter(s => s.type == 1)[0]) {
      setStages([        
        ...stages.filter(s => s.type == 1),
        ...stages.filter(s => s.type == 1)[0].tasks.filter((task) => stages.name == task.text).map(task => ( // for every task that has a existing corresponding stage 
        {
          ...stages.filter((childStage) => childStage.name == task.text)[0],
          active: task.reminder,
        }
      )), ])
    }
  }, [stages[0].tasks])

  const clearStagesTwo = () => setStages([
    {
      name: "buckets",
      active: true,
      tasks: [],
      type: 1
    }
  ])

  const setStageTwoTasks = (newTasks) => { // array
    const activeStage = stages.filter(stage => stage.active && stage.type == 2)[0]
    const newStage = {
        name: activeStage.name,
        active: activeStage.active,
        tasks: newTasks,
        type: activeStage.type
    }

    setStages(
      [...stages.filter(s => s.name !== activeStage.name), newStage]
    )
  }

  useKey("KeyD", toggleDarkMode);
  
  return (
    <div className={darkMode1 ? "theme-dark" : ""}>
      <div className="App ">
      <DarkModeButton onToggle={toggleDarkMode} />
        <div className="flex flex-row gap-x-5 justify-center mt-12">
          <div className="max-w-lg">
            <Header quotes={quotes} quoteIndex={quoteIndex}/>
            <Stage tasks={stages[0].tasks} setTasks={setBuckets} type={1} showAdd={showAddBucket} setShowAdd={setShowAddBucket} isOpen={showAdd}/>
            <Footer />
          </div>
          
          {stages[0].tasks.filter(task => task.reminder)[0] && <div className="max-w-lg w-lg">
            {stages.filter(stage => stage.active && stage.type == 2)[0] ? (
              <Stage isOpen={showAdd} stageName={stages.filter(stage => stage.active && stage.type == 2)[0].name} type={2} tasks={stages.filter(stage => stage.active && stage.type == 2)[0].tasks} setTasks={setStageTwoTasks} showAdd={showAddTask} setShowAdd={setShowAddTask}/>
            ) : 
            <AddStageButton stages={stages} setStages={setStages} masterTasks={stages[0].tasks} isOpen={showAdd}/> }
          </div> }

        </div>
      </div>      
    </div>
  );
}


export default App;
