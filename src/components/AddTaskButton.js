import { FaPlus } from "react-icons/fa";

function AddTaskButton({onAdd, type}) {
    return (
        <div className="flex opacity-30 btn-3" onClick={onAdd}>
            <FaPlus/>
            <p className="ml-2.5 -mt-1">{type===1 ? "New bucket (b)" : "New task (n)"}</p>
        </div>
    )
}

export default AddTaskButton
