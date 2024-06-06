/* eslint-disable no-undef */
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppContext } from "../../../context/stateProvider";
import LeftSideBar from "../../../components/Sidebar/LeftSideBar/LeftSideBar";
import RightSideBar from "../../../components/Sidebar/RightSideBar/RightSideBar";
import "./Result.css";
import BeatLoader from "react-spinners/BeatLoader";
import { override } from "../../../styles/override";

const Result = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const patientId = context.state.currentPatient._id;
  const apiURL = import.meta.env.VITE_API_ENDPOINT_HOSTED;

  const saveResults = () => {
    setLoading(true);
    let newResult = {
      PatientId: patientId,
      Result: context.state.testResult.prediction,
      Date: context.state.testResult.date,
    };

    fetch(`${apiURL}/patient/save-test?patientId=${patientId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${context.state.userData.token}`,
      },
      body: JSON.stringify(newResult),
    })
      .then((res) => res.json())
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        setLoading(false);

        Swal.fire({
          title: "Result saved!",
          text: "Test result saved successfully",
          icon: "success",
        });

        navigate(`/patient-data?patientId=${patientId}`);
      })
      .catch(() => {
        setLoading(false);

        Swal.fire({
          title: "Error!",
          text: "Unable to complete request. Please try again after some time",
          icon: "error",
        });
      });
  };

  useEffect(() => {
    if (!context.state.currentPatient && !context.state.userData) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.state.currentPatient, context.state.userData]);

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
              {context.state.testResult.prediction === "Indeterminate"
                ? ""
                : "a"}{" "}
              <span id="result-word">
                {context.state.testResult.prediction}
              </span>{" "}
              tumor.{" "}
              {context.state.testResult.prediction === "Indeterminate"
                ? "Kindly handle more tests."
                : ""}{" "}
            </p>
          </div>

          <div className="btn">
            <button
              type="submit"
              className="form-submit"
              id="add-test-btn"
              onClick={saveResults}
            >
              {" "}
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
              {!loading && <p>Save</p>}
            </button>
          </div>
        </div>

        <RightSideBar />
      </div>
    </>
  );
};

export default Result;
