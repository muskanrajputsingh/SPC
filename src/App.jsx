import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { useState } from "react"
import Sidebar from "./components/Sidebar/Sidebar"
import Header from "./components/Header/Header"
import Dashboard from "./Pages/Dashboard/Dashboard"
import ViewUser from "./Pages/UserManagement/ViewUser"
import Login from "./Pages/Login/Login"
import KYC from "./Pages/UserManagement/KYC"
import AddItemM from "./pages/MarketPlace/AddItemM"
import ViewItemM from "./pages/MarketPlace/ViewItemM"
import AddItemP from "./pages/Property/AddItemP"
import ViewItemP from "./pages/Property/ViewItemP"
import Signup from "./Pages/Signup/Signup"

function AppLayout({ darkMode, toggleDarkMode, sidebarOpen, toggleSidebar }) {
  return (
    <>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} darkMode={darkMode} />
      <div className={`main-content${sidebarOpen ? " sidebar-open" : " sidebar-closed"}`}>
        <Header
          toggleSidebar={toggleSidebar}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
        <Routes>
          <Route path="/" element={<Dashboard darkMode={darkMode} />} />
          <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
          <Route path="/users" element={<ViewUser />} />
          <Route path="/kyc" element={<KYC/>} />
          <Route path="/additemM" element={<AddItemM/>} />
          <Route path="/viewitemM" element={<ViewItemM/>}/>
           <Route path="/additemP" element={<AddItemP/>} />
          <Route path="/viewitemP" element={<ViewItemP/>}/>
        </Routes>
      </div>
    </>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className={`dashboard-container${darkMode ? " dark" : ""}`}>
      <Router>
        <Routes>
          {/* Public Route (No sidebar, no header) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />

          {/* Protected Layout */}
          <Route
            path="*"
            element={
              <AppLayout
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
