import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./emailVer.css";
import { success } from "../../assets/export";
import { Button } from "../../components";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const param = useParams();
  console.log(param.id);
  console.log(param.token);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:3000/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error: any) {
        console.log(error);
        setValidUrl(false);
        setErrorMessage(
          error.response?.data?.message || "Verification failed."
        );
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <div>
      {validUrl ? (
        <div className="container">
          <img src={success} alt="success_img" className="success_img" />
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <Button style={{ backgroundColor: "green" }}>Login</Button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </div>
  );
};

export default EmailVerify;
