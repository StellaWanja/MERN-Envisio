/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AppContext } from "../../context/stateProvider";
import "../../styles/patientListView.css";
import BeatLoader from "react-spinners/BeatLoader";
import { override } from "../../styles/override";

const PatientListItem = ({ patient, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_ENDPOINT_HOSTED;

  function viewPatientData() {
    setLoading(true);

    fetch(`${apiURL}/patient?patientId=${patient._id}`, {
      headers: { Authorization: `Bearer ${context.state.userData.token}` },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);

        context.dispatch({
          type: "VIEW_PATIENT",
          payload: result.patient,
        });
        navigate(`/patient-data?patientId=${patient._id}`);
      })
      .catch(() => {
        setLoading(false);

        Swal.fire({
          title: "Error!",
          text: "Unable to complete request. Please try again after some time",
          icon: "error",
        });
      });
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${apiURL}/delete-patient?patientId=${patient._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${context.state.userData.token}` },
        }
      );

      if (!response.ok) {
        throw new Error(`Error deleting patient`);
      }

      onDelete(patient._id);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Unable to complete request. Please try again after some time",
        icon: "error",
      });
    }
  };

  return (
    <li className="patient-item-view">
      <span className="patient-list-title">
        {loading && (
          <BeatLoader
            color="#B7DDFD"
            loading={loading}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        {!loading && <span>{patient.FirstName + " " + patient.LastName}</span>}
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
