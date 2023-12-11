/* eslint-disable no-undef */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/stateProvider";
import "../styles/patientData.css";

const DoctorIcon = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiURL = import.meta.env.VITE_API_ENDPOINT_HOSTED;

  useEffect(() => {
    if (context.state.userData) {
      setLoading(true);
      doctorInfo();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.state.userData]);

  const doctorInfo = () => {
    const userId = context.state.userData.userID;
    fetch(`${apiURL}/auth/user?userId=${userId}`, {
      headers: { Authorization: `Bearer ${context.state.userData.token}` },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
      });
  }

  return (
    <section>
      <div
        className="top-row-container"
        id="doctor-icon"
        style={{ marginTop: "5%" }}
      >
        {loading && user.length === 0 ? (
          <div id="doctor-info">
            {" "}
            <p>Loading...</p>{" "}
          </div>
        ) : (
          <div id="doctor-info">
            <div id="doctor-name">
              <p>{`${user.FirstName} ${user.LastName}`}</p>
              <div className="circle"></div>
            </div>
            <p id="hosp-name">{user.HospitalName}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorIcon;
