import '../App.css';
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

function ExerciseItem({ exercise, onDelete, onEdit}) {



    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><FaRegEdit href="/" onClick={e => {e.preventDefault(); onEdit(exercise)}} /></td>
            <td><FaRegTrashAlt href="/" onClick={e => {e.preventDefault(); onDelete(exercise._id)}} /></td>
        </tr>
        // <div className="collection-item">
        //     <h3>{exercise.name}</h3>
        //     <p>{exercise.reps}, {exercise.weight}, {exercise.unit}, {exercise.date}</p>
        //     <p>

                
        //     </p>
        // </div>
    );
}

export default ExerciseItem;