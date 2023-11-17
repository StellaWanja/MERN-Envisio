import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AppContext } from "../../context/stateProvider";
import "./Dashboard.css";
// import SearchBar from "material-ui-search-bar";
import LeftSideBar from "../../components/Sidebar/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/Sidebar/RightSideBar/RightSideBar";
import PatientListView from "../../components/PatientListView";
import Swal from "sweetalert2";

function Dashboard() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  let hasNoPatient = null;

  function getPatientList() {
    const userid = context.state.userData.userID;
    fetch(
      `https://real-gray-gosling-coat.cyclic.app/api/v2/all-patients?userId=${userid}`,
      //allow for use of bearer authentication token
      { headers: { Authorization: `Bearer ${context.state.userData.token}` } }
    )
      .then((res) => res.json())
      .then((result) => {
        const { patients } = result;

        if (patients.length !== 0) {
          hasNoPatient = false;

          context.dispatch({
            type: "PATIENT_LIST",
            payload: patients,
          });
        }
        hasNoPatient = true;
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Unable to complete request. Please try again after some time",
          icon: "error",
          button: "Close",
        });
      });
  }

  useEffect(() => {
    if (context.state.userData) {
      getPatientList();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.state.userData]);

  const routeChange = () => {
    let path = `/add-patient`;
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <LeftSideBar className="left-bar" />
      <div className="middle-column">
        {/* <SearchBar className="dashboard-search" /> */}

        <div style={{ display: "flex", marginTop: "7%" }}>
          <div className="helloDoc">
            <h2 style={{ fontSize: "30px" }}>
              Hello{" "}
              {context.state.userData ? context.state.userData.firstName : ""}
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

        {hasNoPatient ? (
          <div style={{ display: "block", margin: "6% auto", width: "50%" }}>
            <img
              src="https://i.ibb.co/K0ksSkr/Empty-icon.png"
              alt="Empty-icon"
            />
          </div>
        ) : (
          <div className="patient-list-view">
            <h4>List of Patients</h4>
            <ul id="patient-list-container">
              {context.state.patientList.map((patient) => {
                return <PatientListView key={patient._id} item={patient} />;
              })}
            </ul>
          </div>
        )}
      </div>
      <RightSideBar className="right-bar" />
    </div>
  );
}

export default Dashboard;
