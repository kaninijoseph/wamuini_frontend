import "./signUp.css";
import { useState, ChangeEvent, FormEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fname || !lname || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    const userData = {
      fname,
      lname,
      email,
      password,
    };

    axios
      .post("http://localhost:3000/api/users/signup", userData)
      .then((response) => {
        console.log("Success:", response.data);
        alert("Sign up successful!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Sign up failed.");
      });
  };

  return (
    <div className="wam__signup">
      <form onSubmit={handleSubmit}>
        <div className="wam__signup-names">
          <div className="container">
            <label htmlFor="fname">
              Fname <span>*</span>
            </label>
            <input
              type="text"
              value={fname}
              placeholder="Jayson"
              onChange={handleInputChange(setFname)}
            />
          </div>
          <div className="container">
            <label htmlFor="lname">
              Lname <span>*</span>
            </label>
            <input
              type="text"
              value={lname}
              placeholder="Odrey"
              onChange={handleInputChange(setLname)}
            />
          </div>
        </div>

        <div className="wam__signup-email container">
          <label htmlFor="email">
            Email <span>*</span>
          </label>
          <input
            type="email"
            value={email}
            placeholder="example@gmail.com"
            onChange={handleInputChange(setEmail)}
          />
        </div>

        <div className="wam__signup-passwords">
          <div className="container">
            <label htmlFor="password">
              Password <span>*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="wam__signup-password_icon">
              {showPassword ? (
                <FaEyeSlash
                  onClick={toggleShowPassword}
                  className="toggle-password"
                />
              ) : (
                <FaEye
                  onClick={toggleShowPassword}
                  className="toggle-password"
                />
              )}
            </div>
          </div>

          <div className="container">
            <label htmlFor="conf-paassword">
              confirmPassword <span>*</span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="wam__signup-conf_password-icon">
              {showConfirmPassword ? (
                <FaEyeSlash
                  onClick={toggleShowConfirmPassword}
                  className="toggle-password"
                />
              ) : (
                <FaEye
                  onClick={toggleShowConfirmPassword}
                  className="toggle-password"
                />
              )}
            </div>
          </div>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
