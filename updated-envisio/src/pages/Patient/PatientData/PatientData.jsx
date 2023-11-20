import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { AppContext } from "../../../context/stateProvider";
import LeftSideBar from "../../../components/Sidebar/LeftSideBar/LeftSideBar";
import RightSideBar from "../../../components/Sidebar/RightSideBar/RightSideBar";
//import Table from "../../components/Table";
import "../../../styles/patientData.css";

const Styles = styled.div`
  table {
    width: 100%;
    border-spacing: 0;
    border: none;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th {
      text-align: left;
    }
    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: none;
      border-right: none;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

const PatientData = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const patientId = context.state.currentPatient._id;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const changeRoute = () => {
    let path = `/prediction?patientId=${patientId}`;
    navigate(path);
  };

  useEffect(() => {
    if (context.state.currentPatient && context.state.userData) {
      setLoading(true);
      viewTestResults();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.state.currentPatient, context.state.userData]);

  const viewTestResults = () => {
    fetch(
      `https://lime-weary-wombat.cyclic.app/api/v2/patient/all-tests?patientId=${patientId}`,
      //allow for use of bearer authentication token
      { headers: { Authorization: `Bearer ${context.state.userData.token}` } }
    )
      .then((res) => res.json())
      .then((result) => {
        context.dispatch({
          type: "ADD_RESULT",
          payload: result.tests,
        });

        setResults(result.tests);
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
  };

  const loadingText = (
    <tr>
      <td style={{ textAlign: "center" }} colSpan={3}>
        Loading...
      </td>
    </tr>
  );

  const res = results.map((testResult) => {
    const { _id, Date, Result } = testResult;
    return (
      <tr key={_id}>
        <td>Breast Cancer</td>
        <td>{Date}</td>
        <td>{Result}</td>
      </tr>
    );
  });

  const noDataFound = (
    <tr>
      <td style={{ textAlign: "center" }} colSpan={3}>
        No data available
      </td>
    </tr>
  );

  return (
    <>
      <div className="dashboard-container">
        <LeftSideBar />

        <div className="patient-data-wrapper">
          <span className="personal-details-title">Personal Details</span>
          <span className="personal-details-title" id="medhistory-title">
            Family Medical History
          </span>
          <div className="patient-data-container">
            <div className="patient-data-div">
              <ul id="patient-data-list">
                <li className="patient-data-list-item">
                  FIRST NAME:
                  <span className="list-item-data">
                    {context.state.currentPatient.FirstName}
                  </span>
                </li>
                <li className="patient-data-list-item">
                  LAST NAME:
                  <span className="list-item-data">
                    {" "}
                    {context.state.currentPatient.LastName}
                  </span>
                </li>
                <li className="patient-data-list-item">
                  MARITAL STATUS:
                  <span className="list-item-data">
                    {" "}
                    {context.state.currentPatient.MaritalStatus}
                  </span>
                </li>
                <li className="patient-data-list-item">
                  DOB:
                  <span className="list-item-data">
                    {" "}
                    {context.state.currentPatient.DOB}
                  </span>
                </li>
                <li className="patient-data-list-item">
                  HEIGHT:
                  <span className="list-item-data">
                    {" "}
                    {context.state.currentPatient.Height} CM
                  </span>
                </li>
                <li className="patient-data-list-item">
                  WEIGHT:
                  <span className="list-item-data">
                    {" "}
                    {context.state.currentPatient.Weight} KG
                  </span>
                </li>
              </ul>
            </div>

            <div className="patient-data-div">
              <p id="medhistory-text">
                {context.state.currentPatient.FamilyMedicalHistory}
              </p>
            </div>
            
          </div>
          <span className="personal-details-title">Test results</span>
          <div className="patient-data-test-container">
            <Styles>
              <table>
                <thead>
                  <tr>
                    <th>Test</th>
                    <th>Date</th>
                    <th>Result</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && results.length === 0 && loadingText}
                  {!loading && results.length > 0 && res}
                  {!loading && results.length === 0 && noDataFound}
                </tbody>
              </table>
            </Styles>
          </div>

          <div className="btn">
            <button
              type="submit"
              className="form-submit"
              id="add-test-btn"
              onClick={changeRoute}
            >
              Start Test
            </button>
          </div>
        </div>

        <RightSideBar />
      </div>
    </>
  );
};

export default PatientData;
