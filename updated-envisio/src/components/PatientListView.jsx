/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import { useNavigate } from "react-router";
import "../styles/patientListView.css";
import { AppContext } from "../context/stateProvider";
import Swal from "sweetalert2";

function patientListView({ item }) {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  function viewPatientData() {
    fetch(`https://envisio-backend.vercel.app/api/v2/patient?patientId=${item._id}`, {
      headers: { Authorization: `Bearer ${context.state.userData.token}` },
    })
      .then((res) => res.json())
      .then((result) => {
        context.dispatch({
          type: "VIEW_PATIENT",
          payload: result.patient,
        });
        navigate(`/patient-data?patientId=${item._id}`);
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

  return (
    <li className="patient-item-view">
      <span className="patient-list-title">
        {item.FirstName + " " + item.LastName}
      </span>
      <span className="View" onClick={viewPatientData}>
        View
      </span>
    </li>
  );
}

export default patientListView;
