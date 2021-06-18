import useKey, {waitForEl} from ".././utils/useKey";
import { FaPlus } from "react-icons/fa";

const AddStageButton = ({stages, setStages, masterTasks, isOpen}) => {
    const addStage = () => {
        const activeTask = masterTasks.filter(task => task.reminder)[0];
        if (!activeTask) {
            console.log("No active task");
            return;
        }
        const stageName = activeTask.text;
        if (!stageName) return;
        const newStage = {
            name: stageName,
            active: true,
            tasks: [],
            type: 2,
        }
        setStages([...stages, newStage])
    }
  

    // toggle upon clicking add
    const addStageKeyboard = (e) => {
        if (!isOpen) {
            addStage();
            e.preventDefault();
        }
    }
    useKey("KeyS", addStageKeyboard);
  
    return (
        <div className="btn-3 h-full flex content-center w-lg opacity-0 hover:opacity-30" onClick={addStage}>
            <div className="mt-auto flex">
                <FaPlus/>
                <p className="ml-2.5 -mt-1">New stage (s)</p>
            </div>
        </div>
    )
}

export default AddStageButton
