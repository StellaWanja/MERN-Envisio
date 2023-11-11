import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/stateProvider";
import "../styles/patientData.css";

const DoctorIcon = () => {
  const context = useContext(AppContext);
  const userId = context.state.userData.userID;
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v2/auth/user?userId=${userId}`, {
      headers: { Authorization: `Bearer ${context.state.userData.token}` },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
      });
  }, [context.state.userData.token, userId]);

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
