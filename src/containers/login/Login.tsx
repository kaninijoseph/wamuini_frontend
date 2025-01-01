import "./login.css";
import { useState, ChangeEvent, FormEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert("fill all fields.");
      return;
    }

    const LogData = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        LogData
      );
      const { accessToken, message } = response.data;
      if (accessToken) {
        localStorage.setItem("WamuiniAppAuthToken", accessToken);
        alert(message);
        navigate("/market");
      }
    } catch (error) {
      console.error("Error:", error);
      alert({ Error: error });
    }
  };

  return (
    <div className="wam__login">
      <form onSubmit={handleLogin}>
        <div className="email">
          <input
            type="email"
            placeholder="email"
            onChange={handleInputChange(setEmail)}
          />
        </div>
        <div className="password">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleInputChange(setPassword)}
            placeholder="password"
          />
          <div className="wam__login-password_icon">
            {showPassword ? (
              <FaEyeSlash
                onClick={toggleShowPassword}
                className="toggle-password"
              />
            ) : (
              <FaEye onClick={toggleShowPassword} className="toggle-password" />
            )}
          </div>
        </div>

        <p>
          Don't have an account? <a href="/signup">Signup.</a>
        </p>
        <div className="button-container">
          <button className="wam__login-button" type="submit">
            Login
          </button>
        </div>

        <p className="forgot-pass">
          <a href="#">Forgot your Password?</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
