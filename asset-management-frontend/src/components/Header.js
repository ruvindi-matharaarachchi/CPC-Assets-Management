import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Ensure logo.png exists
import "./Header.css"; // Import CSS

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Company Logo" className="logo" />
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/assets">Assets</Link></li>
          <li><Link to="/add-asset">Add Asset</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
