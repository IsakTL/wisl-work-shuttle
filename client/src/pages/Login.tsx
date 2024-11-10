import { useState, FormEvent, ChangeEvent } from "react";
import './login.css'
import Auth from "../utils/auth"; // Import the Auth utility for managing authentication state
import { login } from "../api/authAPI"; // Import the login function from the API
import { UserLogin } from "../interfaces/UserLogin"; // Import the interface for UserLogin


const Login = () => {
  // State to manage the login form data
  const [loginData, setLoginData] = useState<UserLogin>({
    username: "",
    password: "",
  });

  // Handle changes in the input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API endpoint with loginData
      
      const data = await login(loginData);
      
      console.log(data)
      // If login is successful, call Auth.login to store the token in localStorage
      // TODO: save token to local storage
      Auth.login(data.token);
      localStorage.setItem('authToken', data.token)
    } catch (err) {
      // alert("Failed to login"); // Log any errors that occur during login
    }
  };

  return (
    
    <div className="form-container">
      <form className="form login-form" onSubmit={handleSubmit}>
        <h1>Welcome WISL Workers</h1>
        {/* Username input field */}
        <div className="form-group">
          <label>Employee ID</label>
          <input
            className="form-input in"
            type="text"
            name="username"
            value={loginData.username || ""}
            onChange={handleChange}
          />
        </div>
        {/* Password input field */}
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-input in"
            type="password"
            name="password"
            value={loginData.password || ""}
            onChange={handleChange}
          />
        </div>
        {/* Submit button for the login form */}
        <div className="form-group btn-div">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </form>
      <img  src='https://images.pexels.com/photos/385997/pexels-photo-385997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='pic'></img>
      <footer className='foot'>Crafted with Care, sincerely, Woods, Idris, Stephenson, Larrson,</footer>
    </div>
    
  );
};

export default Login;
