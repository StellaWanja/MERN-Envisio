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

  function getPatientList() {
    const userid = context.state.userData.userID;
    fetch(
      `https://lime-weary-wombat.cyclic.app/api/v2/all-patients?userId=${userid}`,
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
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.state.userData]);

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
      <div className="middle-column">

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

        {data.length === 0 && !loading && noDataandLoading}
        {data.length === 0 && loading && noDataWithLoading}
        {data.length > 0 && !loading && dataDisplay}
      </div>
      <RightSideBar className="right-bar" />
    </div>
  );
}

export default Dashboard;
