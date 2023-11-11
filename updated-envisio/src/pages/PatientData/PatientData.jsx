import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/stateProvider";
import LeftSideBar from "../../components/Sidebar/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/Sidebar/RightSideBar/RightSideBar";
import Table from "../../components/Table";
import "../../styles/patientData.css";
import Swal from "sweetalert2";
import styled from "styled-components";

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

function PatientData() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const patientId = context.state.currentPatient.id;
  const [results, setResults] = useState([]);

  function changeRoute() {
    let path = `/prediction`;
    navigate(path);
  }

  function viewTestResults() {
    // fetch(
    //   `https://envisio-001.herokuapp.com/api/v1/TestResult/all-results?patientId=${patientId}`,
    //   //allow for use of bearer authentication token
    //   { headers: { Authorization: `Bearer ${context.state.userData.token}` } }
    // )
    //   .then((res) => res.json())
    //   .then((result) => {
    //     // context.dispatch({
    //     //     type: "ADD_RESULT",
    //     //     payload: result,
    //     // })
    //     setResults(result);
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     Swal.fire({
    //       title: "Error!",
    //       text: "Unable to complete request. Please try again after some time",
    //       icon: "error",
    //       button: "Close",
    //     });
    //     console.log({ err });
    //   });
  }

  useEffect(() => {
    viewTestResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  let test, result, date;

  {
    {
      results.map((res) => {
        result = res.result;
        test = res.test;
        date = res.date;
      });
    }
  }

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
                <tr>
                  <th>Test</th>
                  <th>Date</th>
                  <th>Result</th>
                </tr>

                {results.map((testResult) => {
                  const { id, test, date, result } = testResult;
                  return (
                    <tr key={id}>
                      <td>{test}</td>
                      <td>{date}</td>
                      <td>{result}</td>
                    </tr>
                  );
                })}
              </table>
            </Styles>
          </div>

          <button
            type="submit"
            className="form-submit"
            id="add-test-btn"
            onClick={changeRoute}
          >
            Start Test
          </button>
        </div>

        <RightSideBar />
      </div>
    </>
  );
}

export default PatientData;
