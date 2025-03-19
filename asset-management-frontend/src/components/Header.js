import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Replace with your actual logo path

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center px-8 py-4 bg-opacity-20 backdrop-blur-md bg-white shadow-lg fixed top-0">
      <img src={logo} alt="Company Logo" className="h-12" />

      <nav>
        <ul className="flex gap-6 text-white font-semibold">
          <li><Link to="/" className="hover:text-red-400">Home</Link></li>
          <li><Link to="/assets" className="hover:text-red-400">Assets</Link></li>
          <li><Link to="/dashboard" className="hover:text-red-400">Dashboard</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
