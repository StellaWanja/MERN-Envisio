/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AppContext } from "../../context/stateProvider";
import "../../styles/patientListView.css";

const PatientListItem = ({ patient, onDelete }) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_ENDPOINT_HOSTED;

  function viewPatientData() {
    fetch(
      `${apiURL}/patient?patientId=${patient._id}`,
      {
        headers: { Authorization: `Bearer ${context.state.userData.token}` },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        context.dispatch({
          type: "VIEW_PATIENT",
          payload: result.patient,
        });
        navigate(`/patient-data?patientId=${patient._id}`);
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Unable to complete request. Please try again after some time",
          icon: "error"
        });
      });
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiURL}/delete-patient?patientId=${patient._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${context.state.userData.token}` }
      });

      if (!response.ok) {
        throw new Error(`Error deleting patient`);
      }

      onDelete(patient._id);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Unable to complete request. Please try again after some time",
        icon: "error"
      });
    }
  }

  return (
    <li className="patient-item-view">
      <span className="patient-list-title">
        {patient.FirstName + " " + patient.LastName}
      </span>
      <div className="card-options">
        <span className="View" onClick={viewPatientData}>
          View
        </span>
        <span className="Delete" onClick={handleDelete}>
          Delete
        </span>
      </div>
    </li>
  );
};

export default PatientListItem;
