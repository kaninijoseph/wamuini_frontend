import React from "react";
import { Slider } from "../../components";
import { imgA } from "../../assets/export";
import "./home.css";

function Home() {
  return (
    <div className="wam__home padding-section">
      <div className="wam__home-slider">
        <Slider />
      </div>

      <div className="wam__home-about_us">
        <h2>About Us</h2>
        <div className="wam__home-about_us-container">
          <div className="wam__home-about_us-img">
            <img className="imgag" src={imgA} alt="" />
          </div>
          <div className="wam__home-about_us-messg">
            <h4>Mission</h4>
            <p>
              Our mission is to create a welcoming community where members can
              connect, collaborate, and support each other. We strive to build
              meaningful relationships and empower everyone to contribute to our
              shared success.
            </p>
            <h4>Vission</h4>
            <p>
              To be a thriving hub of connection, collaboration, and support,
              empowering members to achieve collective growth and success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
