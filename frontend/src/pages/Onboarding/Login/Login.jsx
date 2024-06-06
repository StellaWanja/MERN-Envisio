/* eslint-disable no-undef */
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { AppContext } from "../../../context/stateProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "../../../styles/Register.css";
import Header from "../../../components/Header/Header";
import SideColor from "../../../components/Sidecolor/Sidecolor";
import useMatchMedia from "../../../custom-hooks/useMatchMedia";
import { override } from "../../../styles/override";

function Login() {
  const [loading, setLoading] = useState(false);
  const context = useContext(AppContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_ENDPOINT_HOSTED;

  const loginHandler = ({ email, password }) => {
    setLoading(true);
    if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+\.[A-Za-z]/.test(email) !== true) {
      return alert("please enter a valid email address");
    }

    let userdata = {
      Email: email,
      Password: password,
    };

    fetch(`${apiURL}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userdata),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 400) {
          setLoading(false);

          return Swal.fire({
            title: "Invalid Credentials",
            text: "Kindly input correct details",
            icon: "error",
          });
        }

        context.dispatch({
          type: "LOGIN",
          payload: result,
        });

        Swal.fire({
          title: "Login Successful",
          text: "Login attempt successful",
          icon: "success",
        });

        setLoading(false);
        localStorage.setItem("accessToken", result.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
        });
      });
  };

  const isDesktopResolution = useMatchMedia("(min-width:768px)", true);
  return (
    <>
      <Header />
      {isDesktopResolution && <SideColor />}

      <div id="grid-container">
        {/* <div className="color-side column"></div> */}
        <div className="register-form-container column">
          <div className="form">
            <div className="login_title main_title">Log In</div>
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
              <form onSubmit={handleSubmit(loginHandler)}>
                <div className="input-container">
                  <input
                    id="email"
                    className="input"
                    type="email"
                    name="email"
                    {...register("email", { required: true })}
                    placeholder=" "
                  />
                  <div className="cut" />
                  <label htmlFor="email" className="placeholder">
                    Email Address
                  </label>
                </div>
                <div className="input-container">
                  <input
                    id="password"
                    className="input"
                    type="password"
                    name="password"
                    {...register("password", { required: true })}
                    placeholder=" "
                  />
                  <div className="cut" />
                  <label htmlFor="password" className="placeholder">
                    Password
                  </label>
                </div>

                <br />

                <span>
                  <div className="forgot-pwd">
                    {/* <input
                    type="checkbox"
                    className="form-check-input"
                    name="checkedValue"
                    id="checkedValue"
                    value="checkedValue"
                  /> */}

                    {/* <span>Remember me</span> */}

                    <span id="forgot-pwd">
                      <Link className="login-link" to="/forgot-password">
                        {" "}
                        Forgot Password?
                      </Link>
                    </span>
                  </div>
                </span>
                <button type="submit" className="form-submit">
                  Log In
                </button>
              </form>
            )}
            <p className="to_login">
              {" "}
              Don&apos;t have an account?
              <a className=" to_login login-link" href="/signup">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
