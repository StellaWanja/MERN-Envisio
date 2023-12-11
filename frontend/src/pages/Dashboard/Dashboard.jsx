/* eslint-disable no-undef */
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/stateProvider";
import "./Dashboard.css";
import LeftSideBar from "../../components/Sidebar/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/Sidebar/RightSideBar/RightSideBar";
import PatientListView from "../../components/PatientsList/PatientListView";
import Swal from "sweetalert2";

function Dashboard() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const apiURL = import.meta.env.VITE_API_ENDPOINT_HOSTED;

  function getPatientList() {
    const userid = context.state.userData.userID;
    fetch(
      `${apiURL}/all-patients?userId=${userid}`,
      //allow for use of bearer authentication token
      { headers: { Authorization: `Bearer ${context.state.userData.token}` } }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.patients.length > 0) {
          setData(result.patients);

          context.dispatch({
            type: "PATIENT_LIST",
            payload: result.patients,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Unable to complete request. Please try again after some time",
          icon: "error",
          button: "Close",
        });
      });
    setLoading(false);
  }

  useEffect(() => {
    if (context.state.userData) {
      setLoading(true);
      getPatientList();
      doctorInfo();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.state.userData, context.state.userData.userID]);

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

  function logOut() {
    context.dispatch({
      type: "LOGOUT",
    });

    navigate("/login");
  }

  const routeChange = () => {
    let path = `/add-patient`;
    navigate(path);
  };

  const handleDelete = (id) => {
    const patientList = data.filter((patient) => patient._id !== id);
    setData(patientList);
    Swal.fire({
      title: "Patient deleted successfully!",
      icon: "success",
    });
  };

  const noDataandLoading = (
    <div style={{ display: "block", margin: "6% auto", width: "50%" }}>
      <img src="https://i.ibb.co/K0ksSkr/Empty-icon.png" alt="Empty-icon" />
    </div>
  );

  const noDataWithLoading = (
    <div style={{ display: "block", margin: "6% auto", width: "50%" }}>
      <p>Loading...</p>
    </div>
  );

  const dataDisplay = (
    <div className="patient-list-view">
      <h4>List of Patients</h4>
      <PatientListView patients={data} onDelete={handleDelete} />
    </div>
  );

  return (
    <div className="dashboard-container">

      <LeftSideBar className="left-bar" />

      <div className="top-resp-img">
      <img src="https://i.ibb.co/7C52Mmv/logo.png" alt="logo" />
      <div className="logout-container" onClick={logOut}>
        <img src="https://i.ibb.co/qrptfQY/log-out.png" alt="log-out" />
      </div>
      </div>

      <div className="middle-column">

        <div className="doc-info-section" style={{ display: "flex", marginTop: "7%" }}>
          <div className="helloDoc">
            <h2 style={{ fontSize: "30px" }}>
              Hello{" "}
              {context.state.userData ? `${user.FirstName} ${user.LastName}` : ""}
            </h2>
            <span style={{ color: "#7A7A7A", fontSize: "20px" }}>
              Welcome to your Envisio Dashboard.
            </span>
          </div>
          <div className="addPatientContainer">
            <button className="add-patient" type="submit" onClick={routeChange}>
              <img
                src="https://i.ibb.co/BgJsF2v/user-plus.png"
                alt="add-patient"
              />
              <p style={{ color: "#ffff", padding: "8px", fontSize: "15px" }}>
                Add Patient
              </p>
            </button>
          </div>
        </div>

        {data.length === 0 && !loading && noDataandLoading}
        {data.length === 0 && loading && noDataWithLoading}
        {data.length > 0 && !loading && dataDisplay}
      </div>

 
      <RightSideBar className="right-bar" />
    </div>
  );
}

export default Dashboard;
