import { FaPlus } from "react-icons/fa";

const AddStageButton = ({addStage}) => {

  
    return (
        <div className="btn-3 h-full flex content-center w-lg hover:opacity-30" onClick={addStage}>
            <div className="mt-auto flex">
                <FaPlus/>
                <p className="ml-2.5 -mt-1">New stage (s)</p>
            </div>
        </div>
    )
}

export default AddStageButton
