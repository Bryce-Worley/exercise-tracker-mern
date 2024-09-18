// import SelectQuantity from "./SelectQuantity"

function ExerciseRow({exercise}){
    return(
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><SelectQuantity /></td>
        </tr>
    )
}
export default ExerciseRow;