import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    navigate('/login'); 
  };

  return (
    <nav>
      <ul>
        <li><Link to="/shift">Shift</Link></li>
        <li><Link to="/weather">Weather</Link></li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
