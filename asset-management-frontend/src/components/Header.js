import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import "./Header.css"; // Import CSS

const Header = () => {
  return (
    <header className="header">
      {/* Profile Icon */}
      <div className="profile-icon">
        <FaUserCircle />
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/assets">Asset Issues</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
