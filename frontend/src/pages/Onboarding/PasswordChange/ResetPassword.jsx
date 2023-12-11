/* eslint-disable no-undef */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import "../../../styles/Register.css";
import Swal from "sweetalert2";
import Header from "../../../components/Header/Header";
import SideColor from "../../../components/Sidecolor/Sidecolor";
import useMatchMedia from "../../../custom-hooks/useMatchMedia";

function ResetPassword() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const apiURL = import.meta.env.VITE_API_ENDPOINT_LOCALHOST;

  const newpasswordHandler = async ({
    email,
    newPassword,
    ConfirmnewPassword,
  }) => {
    let userEmail = {
      Email: email,
      Password: newPassword,
      ConfirmPassword: ConfirmnewPassword,
    };

    // make API call
    fetch(`${apiURL}/auth/reset-password`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEmail),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          Swal.fire({
            title: "Password Updated Successful",
            text: " Proceed to login ",
            icon: "success",
            button: "Close",
          });
          navigate("/login");
        } else {
          return Swal.fire({
            title: "Password Update Unsuccessful",
            text: result.message,
            icon: "error",
            button: "Close",
          });
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
          <div className="form">
            <h2 className="main_title ">Reset Password</h2>
            <p className="center">You&apos;re almost there</p>
            <br />
            <form onSubmit={handleSubmit(newpasswordHandler)}>
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
                  Re-Enter Email Address
                </label>
              </div>

              <div className="input-container">
                <input
                  id="newPassword"
                  className="input"
                  type="password"
                  {...register("newPassword", { required: true })}
                  placeholder=" "
                />
                <br />

                <div className="cut" />
                <label htmlFor="password" className="placeholder">
                  Password
                </label>
              </div>
              <br />
              <div className="input-container">
                <input
                  id="ConfirmnewPassword"
                  className="input"
                  type="password"
                  {...register("ConfirmnewPassword", { required: true })}
                  placeholder=" "
                />
                <br />
                <div className="cut" />
                <label htmlFor="Password" className="placeholder">
                  Confirm Password
                </label>
              </div>
              <button type="submit" className="form-submit-create-new-password">
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
