import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../context/stateProvider";
import LeftSideBar from "../../../components/Sidebar/LeftSideBar/LeftSideBar";
import RightSideBar from "../../../components/Sidebar/RightSideBar/RightSideBar";
import "./Result.css";
import Swal from "sweetalert2";

const Result = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  if(context.state.userData.userID === null) navigate('/login');

  const saveResults = () => {
    let newResult = {
      PatientId: context.state.currentPatient.id,
      Result: context.state.testResult,
    };

    fetch("https://envisio-001.herokuapp.com/api/v1/TestResult/test-result", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${context.state.userData.token}`,
      },
      body: JSON.stringify(newResult),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        Swal.fire({
          title: "Result saved!",
          text: "Test result saved successfully",
          icon: "success",
          button: "Close",
        });

        navigate("/patient-data");
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
    <>
      <div className="dashboard-container">
        <LeftSideBar />

        <div className="result-wrapper">
          <h3 id="result-title">Your test result is ready!</h3>
          <p id="disclaimer">
            This prediction result should not be used as a substitute for real
            medical advice.{" "}
          </p>
          <div className="result-container">
            <p id="result-text">
              Based on the inputs provided, results show that patient may have{" "}
              {context.state.testResult === "Indeterminate" ? "" : "a"}{" "}
              <span id="result-word">{context.state.testResult}</span> tumor.{" "}
              {context.state.testResult === "Indeterminate" ? "Kindly handle more tests." : ""}{" "}
            </p>
          </div>

          <button
            type="submit"
            className="form-submit"
            id="add-test-btn"
            onClick={saveResults}
          >
            Save
          </button>
        </div>

        <RightSideBar />
      </div>
    </>
  );
};

export default Result;
