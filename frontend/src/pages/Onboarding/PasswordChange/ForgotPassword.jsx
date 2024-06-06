/* eslint-disable no-undef */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import "../../../styles/Register.css";
import Header from "../../../components/Header/Header";
import SideColor from "../../../components/Sidecolor/Sidecolor";
import useMatchMedia from "../../../custom-hooks/useMatchMedia";
import Swal from "sweetalert2";
import BeatLoader from "react-spinners/BeatLoader";
import { override } from "../../../styles/override";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const apiURL = import.meta.env.VITE_API_ENDPOINT_HOSTED;

  const forgotpasswordHandler = async ({ email }) => {
    setLoading(true);
    let userEmail = {
      Email: email,
    };

    fetch(`${apiURL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userEmail),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setLoading(false);
          navigate("/reset-password");
        } else {
          setLoading(false);
          new Swal.fire({
            title: "Oh Oh!",
            text: "The email doesn't exist, please register with Envisio!",
            icon: "error",
            button: "Close",
          });
          navigate("/signup");
        }
      });
  };

  const isDesktopResolution = useMatchMedia("(min-width:768px)", true);
  return (
    <>
      {isDesktopResolution && <SideColor />}
      <Header />
      <div id="grid-container">
        <div className="register-form-container column">
          <div className="reset-password-form">
            <h2 className="main_title ">Reset Password</h2>
            <p className="center">oops... Forgot password?</p>
            <p className="center">
              Input your registered email to initiate reset
            </p>
            <br />
            {loading && (
              <BeatLoader
                color="#B7DDFD"
                loading={loading}
                cssOverride={override}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
            {!loading && (
              <form onSubmit={handleSubmit(forgotpasswordHandler)}>
                <div className="input-container">
                  <input
                    id="email"
                    className="input"
                    type="text"
                    {...register("email", { required: true })}
                    placeholder=" "
                  />
                  <div className="cut" />
                  <label htmlFor="email" className="placeholder">
                    Email Address
                  </label>
                </div>
                <button type="submit" className="form-submit-resetpassword">
                  Confirm
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default ForgotPassword;
