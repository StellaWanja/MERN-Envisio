import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/stateProvider";
import "../styles/patientData.css";

const DoctorIcon = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (context.state.userData) {
      const userId = context.state.userData.userID;
      fetch(`https://real-gray-gosling-coat.cyclic.app/api/v2/auth/user?userId=${userId}`, {
        headers: { Authorization: `Bearer ${context.state.userData.token}` },
      })
        .then((res) => res.json())
        .then((result) => {
          setUser(result.user);
        });
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.state.userData]);

  return (
    <section>
      <div
        className="top-row-container"
        id="doctor-icon"
        style={{ marginTop: "5%" }}
      >
        <div id="doctor-info">
          <div id="doctor-name">
            <p>{`${user.FirstName} ${user.LastName}`}</p>
            <div className="circle"></div>
          </div>
          <p id="hosp-name">{user.HospitalName}</p>
        </div>
      </div>
    </section>
  );
};

export default DoctorIcon;
