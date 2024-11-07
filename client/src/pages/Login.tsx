import { useState, FormEvent, ChangeEvent } from "react";

import Auth from "../utils/auth"; // Import the Auth utility for managing authentication state
import { login } from "../api/authAPI"; // Import the login function from the API
import { UserLogin } from "../interfaces/UserLogin"; // Import the interface for UserLogin


const Login = () => {
  // State to manage the login form data
  const [loginData, setLoginData] = useState<UserLogin>({
    firstName: "",
    lastName: "",
    employeeID: "",
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
      
      // If login is successful, call Auth.login to store the token in localStorage
      Auth.login(data.token);
    } catch (err) {
      alert("Failed to login"); // Log any errors that occur during login
    }
  };

  return (
    <div className="form-container">
      <form className="form login-form" onSubmit={handleSubmit}>
        <h1>Welcome WISL Workers</h1>
        {/* Username input field */}
        <div className="form-group">
          <label>First Name</label>
          <input
            className="form-input"
            type="text"
            name="firstName"
            value={loginData.firstName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            className="form-input"
            type="text"
            name="lastName"
            value={loginData.lastName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Employee ID</label>
          <input
            className="form-input"
            type="text"
            name="employeeID"
            value={loginData.employeeID || ""}
            onChange={handleChange}
          />
        </div>
        {/* Password input field */}
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={loginData.password || ""}
            onChange={handleChange}
          />
        </div>
        {/* Submit button for the login form */}
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
