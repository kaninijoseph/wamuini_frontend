import axios from "axios";
import { Button } from "../../components";
import "./reqEmail.css";

const RequestEmail: React.FC = () => {
  return (
    <div className="ptfl__reqemail component-padding">
      <div className="ptfl__reqemail-container">
        <div className="ptfl__reqemail-salutation">
          <h3>Welcome Aboard</h3>
          <p>We are glad you are joining us.</p>
        </div>
        <div className="ptfl__reqemail-req">
          <h3>Verify Email</h3>
          <p>
            To be able to access all our services, first you need to verify your
            email
          </p>
          <p>click the button to verify your email</p>
          <div className="ptfl__reqemail-button">
            <Button style={{ backgroundColor: "green" }}>Verify Email</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestEmail;
