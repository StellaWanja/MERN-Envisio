import { Link, NavLink } from "react-router-dom";
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
          <img
            className="sidebar-icon"
            src="https://i.ibb.co/7tH9Vwj/layout.png"
            alt="dashboard-icon"
          />
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
          <img src="https://i.ibb.co/YbrywhC/clock.png" alt="clock" />
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
          <img
            src="https://i.ibb.co/tqxbHP5/predictionicon.png"
            alt="predictionicon"
          />
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
