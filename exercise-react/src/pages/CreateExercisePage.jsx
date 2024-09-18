import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date}
        const response = await fetch(
            '/exercises', {
                method: 'POST', 
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newExercise)
                }
        );
        if(response.status === 201){
            alert("Successfully added the exercise");
        } else{
            alert("Failed to add exercise, status code = " + response.status)
        }
        navigate('/')
    };

    return (
        <div className='add'>
            <h3>Add Exercise</h3>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.valueAsNumber)} />
            <input
                type="number"
                value={weight}
                placeholder="Enter weight here"
                onChange={e => setWeight(e.target.valueAsNumber)} />
            <select
                type="text"
                name="Enter unit here"
                value={unit}
                onChange={e => setUnit(e.target.value)}>
                    <option value="kgs">kgs</option>
                    <option value="lbs">lbs</option>
                </select>
            <input
                type="text"
                placeholder="Enter date (MM-DD-YY)"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;