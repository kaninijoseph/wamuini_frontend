import { Link } from "react-router-dom";
import { FaHome, FaStore, FaInfoCircle } from "react-icons/fa";
import "./navbar.css";
import { logo } from "../../assets/export";

const Menu = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/posts">
            <FaInfoCircle /> Posts
          </Link>
        </li>
        <li>
          <Link to="/market">
            <FaStore /> Market
          </Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </>
  );
};

const MenuLinks = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">
            <FaHome />
          </Link>
        </li>
        <li>
          <Link to="/posts">
            <FaInfoCircle />
          </Link>
        </li>
        <li>
          <Link to="/market">
            <FaStore />
          </Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </>
  );
};

function Navbar() {
  return (
    <div className="wam__navbar">
      <div className="wam__navbar-links">
        <div className="wam__navbar-links_logo">
          <img src={logo} alt="wamuini logo" />
        </div>
        <div className="wam__navbar-links_menu">
          <Menu />
        </div>
      </div>

      <div className="wam__navbar-menu">
        <MenuLinks />
      </div>
    </div>
  );
}

export default Navbar;
