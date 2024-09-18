import ExerciseItem from './ExerciseItem';

function ExerciseCollection({ exercises, onDelete, onEdit}) {
    return (
        <div className="exercise-collection">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise) => <ExerciseItem exercise={exercise} onDelete={onDelete} onEdit={onEdit} key={exercise._id} />)}
                </tbody>
            </table>
            
        </div>
    );
}

export default ExerciseCollection;