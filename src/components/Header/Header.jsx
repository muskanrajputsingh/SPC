import "./Header.css" 
import { Link } from "react-router-dom"
import { FaUserPlus } from "react-icons/fa";

const Header = ({ toggleSidebar, toggleDarkMode, darkMode }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button onClick={toggleSidebar} className="sidebar-toggle">
          ☰
        </button>
        <h1 className="page-title">Dashboard</h1>
      </div>
      <div className="header-right">
       
       <div className="login-btn2">
        <button><Link to="/login"><FaUserPlus/></Link></button>
       </div>
      

        <button onClick={toggleDarkMode} className="theme-toggle">
          {darkMode ? "☀️" : "🌙"}
        </button>


        <div className="user-profile">
          <div className="user-avatar">👤</div>
        </div>
      </div>
    </header>
  )
}

export default Header
