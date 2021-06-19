import Header from "./components/Header";
import Footer from "./components/Footer";
import DarkModeButton from "./components/DarkModeButton";
import { useState, useEffect } from "react";
import AddStageButton from "./components/AddStageButton";
import Stage from "./components/Stage";
import useKey, {waitForEl} from "./utils/useKey";

const LOCAL_STORAGE_KEY = "theUltimatePrioritizer.tasks"
const LOCAL_STORAGE_KEY_THEME = "theUltimatePrioritizer.theme"
const LOCAL_STORAGE_KEY_STAGES = "theUltimatePrioritizer.stages"

function App() {
  const [showAddBucket, setShowAddBucket] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  useEffect(() => {
    setFormIsOpen(showAddBucket || showAddTask)
  }, [showAddBucket, showAddTask])
  const [tasks, setTasks] = useState([]);
  const [stages, setStages] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_STAGES)) || []);

  const [darkMode1, setDarkMode1] = useState(false);

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_THEME)); 
    if (storedDarkMode) setDarkMode1(storedDarkMode);
  }, [])
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); 
    if (storedTasks) setTasks(storedTasks);
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]) 

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_STAGES, JSON.stringify(stages));
  }, [stages]) 

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_THEME, JSON.stringify(darkMode1));
  }, [darkMode1]) 

  // Toggle dark mode
  const toggleDarkMode = (e) => {
    if (e instanceof KeyboardEvent){ // it is a keyboard event
      if (formIsOpen) return;
    }
    setDarkMode1(!darkMode1);
  }

  useEffect(() => {
    setStages(
      prevStages => prevStages.map(stage => ({
        ...stage,
        active: tasks.filter(task => stage.name === task.text)[0] ? tasks.filter(task => stage.name === task.text)[0].active : false
      }))
    )
  }, [tasks])

  const setStageTwoTasks = (newTasks) => { // array
    const activeStage = stages.filter(stage => stage.active)[0]
    const newStage = {
        name: activeStage.name,
        active: activeStage.active,
        tasks: newTasks,
    }

    setStages(
      [...stages.filter(s => s.name !== activeStage.name), newStage]
    )
  }

  useKey("KeyD", toggleDarkMode);

  const addStage = () => {
      const activeTask = tasks.filter(task => task.active)[0];
      if (!activeTask) {
          console.log("No active task");
          return;
      }
      const stageName = activeTask.text;
      if (!stageName) return;

      if (stages.filter(stage => stage.name === stageName)[0]) {
          console.log("A stage with this name already exists");
          return;
      }

      const newStage = {
          name: stageName,
          active: true,
          tasks: [],
          type: 2,
      }
      setStages([...stages, newStage]);
  }


  // toggle upon clicking add
  const addStageKeyboard = (e) => {
      if (!formIsOpen) {
          e.preventDefault();
          addStage();
      }
  }
  useKey("KeyS", addStageKeyboard);

  // toggle upon clicking add
  const toggleShowAddBucket = (e) => {
    if (!formIsOpen) {
      setShowAddBucket(true);
      e.preventDefault();
      waitForEl(`add-task-field-${1}`);
    }
  }

  const toggleShowAddTask = (e) => {
    if (!formIsOpen && stages.filter(stage => stage.active)[0] ) {
      setShowAddTask(true);
      e.preventDefault();
      waitForEl(`add-task-field-${2}`);
    }
  }

  useKey("KeyN", toggleShowAddTask);
  useKey("KeyB", toggleShowAddBucket);

  return (
    <div className={darkMode1 ? "theme-dark" : ""}>
      <div className="App ">
      <DarkModeButton onToggle={toggleDarkMode} />
        <div className="flex flex-row gap-x-5 justify-center mt-12">
          <div className="max-w-lg">
            <Header/>
            <Stage thisStageisOpen={true} tasks={tasks} setTasks={setTasks} type={1} showAdd={showAddBucket} setShowAdd={setShowAddBucket} formIsOpen={formIsOpen} toggleShowAdd={toggleShowAddBucket}/>
            <Footer />
          </div>
          
          {tasks.filter(task => task.active)[0] && <div className="max-w-lg w-lg">
            {stages.filter(stage => stage.active)[0] ? (
              <Stage formIsOpen={formIsOpen} stageName={stages.filter(stage => stage.active)[0].name} type={2} tasks={stages.filter(stage => stage.active)[0].tasks} setTasks={setStageTwoTasks} showAdd={showAddTask} setShowAdd={setShowAddTask} toggleShowAdd={toggleShowAddTask}/>
            ) : 
            <AddStageButton addStage={addStage}/> }
          </div> }

        </div>
      </div>      
    </div>
  );
}


export default App;
