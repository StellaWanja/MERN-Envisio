import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import "./TopNavigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// NAVBAR

function TopNavigation() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="nav-logo">
        <NavLink to="/" >
          <Logo />
        </NavLink>
      </div>

      {/* HAMBURGER */}
      <button className="hamburger" onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* LINKS */}
      <div className={isNavExpanded ? "nav-menu expanded" : "nav-menu"}>
        <ul>
          <li>
            <NavLink
              to="/"
              className="nav-link"
              activestyle={{ color: "#212121" }}
            >
              Home
            </NavLink>
          </li>

          <li href="#our-product">
            <a href="#our-product" className="nav-link current">
              Product{" "}
            </a>
          </li>

          <li>
            <NavLink
              to="/contactpage"
              className="nav-link"
              activestyle={{ color: "#212121" }}
            >
              Contact Us
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/teampage"
              className="nav-link"
              activestyle={{ color: "#212121" }}
            >
              Team
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default TopNavigation;
