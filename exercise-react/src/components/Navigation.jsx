import { Link } from 'react-router-dom';
import '../App.css';


function Navigation() {
  return (
    <>
      <nav className='nav'>
        <Link to="/">Home</Link> <Link to="/add-exercise">Create</Link>
      </nav>
    </>
  );
}

export default Navigation;