import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="app">
      <header>
        <h1>Exercise Tracker</h1>
        <p>Full Stack MERN App Demonstration</p>
      </header>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}></Route>
          <Route path="/add-exercise" element={ <CreateExercisePage />}></Route>
          <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route>
        </Routes>
      </Router>
      <footer>&copy; 2024 Bryce Worley</footer>
    </div>
  );
}

export default App;
