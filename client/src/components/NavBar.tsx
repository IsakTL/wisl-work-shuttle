import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <nav>
      <ul>
        <li ><Link to="/shift">Shift</Link></li>
        <li ><Link to="/weather">Weather</Link></li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default NavBar;
