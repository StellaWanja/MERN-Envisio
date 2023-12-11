/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import "../../styles/patientListView.css";
import PatientListItem from "./PatientListItem";

const PatientListView = ({ patients, onDelete }) => {
  return (
    <ul id="patient-list-container">
      {patients.map((patient) => {
        return (
          <PatientListItem
            key={patient._id}
            patient={patient}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  );
};

export default PatientListView;
