import "./Sidebar.css"
import { NavLink, useLocation } from "react-router-dom"
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaUser, FaStore, FaBuilding, FaStar, FaEnvelope } from "react-icons/fa";
import { PiSignOutFill } from "react-icons/pi";
import { HiSpeakerphone } from "react-icons/hi";
import { MdAccountCircle } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

const Sidebar = ({ isOpen, toggleSidebar, darkMode }) => {
  const location = useLocation()
   const [expandedMenus, setExpandedMenus] = useState({})

  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }))
  }

  const menuItems = [
    {
         key: "dashboard", 
         title: "Dashboard", 
         icon: <MdDashboard />, 
         link: "/dashboard" 
    },
    { key: "users", 
      title: "Users", 
      icon: <FaUser />, 
      hasSubmenu: true,
      submenu: [
        { title: "View User", link: "/users" },
        { title: "KYC", link: "/kyc" },
      ],
    },
    { 
    key: "marketplaces", 
    title: "Marketplaces", 
    icon: <FaStore />, 
    hasSubmenu: true,
      submenu: [
        { title: "Add Item", link: "/additemM" },
        { title: "View Item", link: "/viewitemM" },
      ],
    },
    { 
    key: "properties", 
     title: "Properties", 
     icon: <FaBuilding />, 
     hasSubmenu: true,
      submenu: [
        { title: "Add Item", link: "/additemP" },
        { title: "View Item", link: "/viewitemP" },
      ],
    },
    { key: "associate", title: "Associate", icon: <FaStar />, link: "/associate" },
    { key: "announcement", title: "Announcement", icon: <HiSpeakerphone />, link: "/announcement" },
    { key: "enquiries", title: "Enquiries", icon: <FaEnvelope />, link: "/enquiries" },
  ]

  const accountItems = [
    {
      key: "account",
      title: "Account",
      icon: <MdAccountCircle />,
      hasSubmenu: true,
      submenu: [
        { title: "Profile", link: "#" },
        { title: "Security", link: "#" },
      ],
    },
    {
      key: "settings",
      title: "Settings",
      icon: <IoSettings />,
      hasSubmenu: true,
      submenu: [
        { title: "General", link: "#" },
        { title: "Preferences", link: "#" },
      ],
    },
  ]

  const helpItems = [
    {
      key: "help",
      title: "Help Desk",
      icon: <span>❓</span>,
      hasSubmenu: true,
      submenu: [
        { title: "Documentation", link: "#" },
        { title: "Support", link: "#" },
      ],
    },
  ]

const renderMenuItem = (item) => (
    <li key={item.key} className="menu-item">
      {item.hasSubmenu ? (
        <>
          <button
            className={`menu-button ${expandedMenus[item.key] ? "expanded" : ""}`}
            onClick={() => toggleMenu(item.key)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.title}</span>
            <span className="menu-arrow">{expandedMenus[item.key] ? "▼" : "▶"}</span>
          </button>
          {expandedMenus[item.key] && (
            <ul className="submenu">
              {item.submenu.map((subItem, index) => (
                <li key={index} className="submenu-item">
                  <a href={subItem.link} className="submenu-link">
                    {subItem.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <a href={item.link} className={`menu-link ${item.isActive ? "active" : ""}`}>
          <span className="menu-icon">{item.icon}</span>
          <span className="menu-text">{item.title}</span>
        </a>
      )}
    </li>
  )



  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <div className={`sidebar ${isOpen ? "open" : "closed"} ${darkMode ? "dark" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon"><img src="SPC.png" alt="SPC Logo" /></div>
            <span className="logo-text">SPC</span>
          </div>
        </div>

        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <ul className="menu-list">{menuItems.map(renderMenuItem)}</ul>
          </nav>

          <div className="menu-section">
            <div className="section-title">Account & Settings</div>
            <ul className="menu-list">{accountItems.map(renderMenuItem)}</ul>
          </div>

          <div className="menu-section">
            <div className="section-title">Help & Feedback</div>
            <ul className="menu-list">{helpItems.map(renderMenuItem)}</ul>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="signout-btn">
            <span className="menu-icon"><PiSignOutFill /></span>
            <span className="menu-text">Signout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
