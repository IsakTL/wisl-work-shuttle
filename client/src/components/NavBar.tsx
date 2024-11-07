import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    navigate('/login'); 
  };

  return (
    <nav>
      <ul>
        <li className="link"><Link to="/shift">Shift</Link></li>
        <li className="link"><Link to="/weather">Weather</Link></li>
      </ul>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default NavBar;
