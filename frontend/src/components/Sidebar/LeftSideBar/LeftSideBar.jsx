import { Link, NavLink } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOnlinePrediction } from "react-icons/md";
import "./LeftSideBar.css";

export default function LeftSideBar() {
  return (
    <div className="left-column">
      {/* <Link to='/' style={{marginTop: '4vh', marginBottom: '5vh'}} ><Logo className="left-side-logo"/> </Link> */}

      <Link
        to="/"
        style={{ marginTop: "6vh", marginLeft: "5vh" }}
        className="left-logo"
      >
        <img src="https://i.ibb.co/7C52Mmv/logo.png" alt="logo" />
      </Link>
      <ul className="links">
        <div className="sidebar-item">
         <MdOutlineSpaceDashboard style={{ fontSize: "1.5rem"}} />
          <NavLink
            className="sidebar-link"
            to="/dashboard"
            activestyle={{ color: "#212121" }}
            style={({ isActive }) => ({
              color: isActive ? "#212121" : "#a6a6a6",
              borderBottom: isActive ? "2px dotted #EC6DBC" : "",
            })}
          >
            Dashboard
          </NavLink>
        </div>

        <div className="sidebar-item">
          <FaHistory style={{ fontSize: "1.5rem"}} />
          <NavLink
            className="sidebar-link"
            to="/patient-data"
            activestyle={{ color: "#212121" }}
            style={({ isActive }) => ({
              color: isActive ? "#212121" : "#a6a6a6",
              borderBottom: isActive ? "2px dotted #EC6DBC" : "",
            })}
          >
            Patient History
          </NavLink>
        </div>

        <div className="sidebar-item">
          <MdOnlinePrediction style={{ fontSize: "1.5rem"}} />
          <NavLink
            className="sidebar-link"
            to="/prediction"
            activestyle={{ color: "#212121" }}
            style={({ isActive }) => ({
              color: isActive ? "#212121" : "#a6a6a6",
              borderBottom: isActive ? "2px dotted #EC6DBC" : "",
            })}
          >
            Prediction
          </NavLink>
        </div>
      </ul>
    </div>
  );
}
