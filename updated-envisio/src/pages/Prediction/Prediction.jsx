// import { useState } from 'react';
import { useContext } from "react";
import { AppContext } from "../../context/stateProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LeftSideBar from "../../components/Sidebar/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/Sidebar/RightSideBar/RightSideBar";
import "./Prediction.css";
import Swal from "sweetalert2";

const Prediction = () => {
  const { register, handleSubmit } = useForm();
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const predictionHandler = ({age, tumorSize}) => {
    // create data to be sent to the api for validation
    let userinput = {
      Age: age,
      TumorSize: tumorSize,
    };

    fetch("http://localhost:5000/api/v2/predict/predict-test", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${context.state.userData.token}`,
      },
      body: JSON.stringify(userinput),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result["prediction"]);
        context.dispatch({
          type: "ADD_RESULT",
          payload: result.prediction,
        });
        navigate("/prediction-result");
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Unable to complete request. Please try again after some time",
          icon: "error",
          button: "Close",
        });
      });
  };

  return (
    <>
      <div className="dashboard-container">
        <LeftSideBar />

        <div className="prediction-page-container">
          <div>
            <h2>Prediction Test</h2>
            <p>
              Please fill the form below for your prediction. Note that this is
              a sample application <br /> and cannot be used as a substitute for
              real medical advice.
            </p>
          </div>

          <form
            className="prediction-form"
            onSubmit={handleSubmit(predictionHandler)}
          >
            <div className="prediction-form-grid-container">
              <div className="prediction-input-container">
                <label htmlFor="age">Email Address</label>
                <input
                  id="age"
                  {...register("age", { required: true })}
                  className="prediction-input"
                  type="number"
                  min="1"
                  name="age"
                  step="1"
                />
              </div>
              <div className="prediction-input-container">
                <label htmlFor="tumorSize">TUMOR SIZE</label>
                <input
                  id="tumorSize"
                  {...register("tumorSize", { required: true })}
                  className="prediction-input"
                  type="number"
                  min="1"
                  name="tumorSize"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <button
                className="form-submit"
                id="prediction-submit-btn"
                type="submit"
              >
                Get Result
              </button>
            </div>
          </form>
        </div>

        <RightSideBar />
      </div>
    </>
  );
};

export default Prediction;
