import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../context/stateProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "../../../styles/Register.css";
import Header from "../../../components/Header/Header";
import SideColor from "../../../components/Sidecolor/Sidecolor";
import useMatchMedia from "../../../custom-hooks/useMatchMedia";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const registerUser = ({
    firstname,
    lastname,
    hospname,
    email,
    password,
    confirmpassword,
  }) => {
    //confirms that email format is valid
    if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+\.[A-Za-z]/.test(email) !== true) {
      return Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address",
        icon: "error",
      });
    }
    //  confirm if passowords entered match
    if (password !== confirmpassword) {
      return Swal.fire({
        title: "Invalid Credentials",
        text: "Passwords do not match",
        icon: "error",
      });
    }

    let newuser = {
      FirstName: firstname,
      LastName: lastname,
      HospitalName: hospname,
      Email: email,
      Password: password,
      ConfirmPassword: confirmpassword,
    };

    fetch(`http://localhost:5000/api/v2/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newuser),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 400) {
          return Swal.fire({
            title: result.title,
            text: result.message,
            icon: "error",
          });
        } else {
          context.dispatch({
            type: "LOGIN",
            payload: result,
          });

          Swal.fire({
            title: "Registration Successful",
            text: " ",
            icon: "success",
          });
          navigate("/login");
        }
      })

      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        Swal.fire({
          title: "Unsuccessful!",
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
        <div className="register-form-container column">
          <div className="form">
            <div className="main_title">Create Account</div>
            <form onSubmit={handleSubmit(registerUser)}>
              <div className="input-container">
                <input
                  id="firstname"
                  className="input"
                  type="text"
                  {...register("firstname", { required: true })}
                  placeholder=" "
                />

                {/* <div className="cut" /> */}
                <label htmlFor="firstname" className="placeholder">
                  First Name
                </label>
              </div>
              <div className="input-container">
                <input
                  id="lastname"
                  className="input"
                  type="text"
                  {...register("lastname", { required: true })}
                  placeholder=" "
                />

                <div className="cut" />
                <label htmlFor="lastname" className="placeholder">
                  Last Name
                </label>
              </div>
              <div className="input-container">
                <input
                  id="hospname"
                  className="input"
                  type="text"
                  {...register("hospname", { required: true })}
                  placeholder=" "
                />
                <div className="cut" />
                <label htmlFor="hospname" className="placeholder">
                  Hospital Name
                </label>
              </div>
              <div className="input-container">
                <input
                  id="email"
                  className="input"
                  type="email"
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
                  {...register("password", { required: true })}
                  placeholder=" "
                />
                <div className="cut" />
                <label htmlFor="Password" className="placeholder">
                  Password
                </label>
              </div>
              <div className="input-container">
                <input
                  id="confirmpassword"
                  className="input"
                  type="password"
                  {...register("confirmpassword", { required: true })}
                  placeholder=" "
                />
                <div className="cut" />
                <label htmlFor="confirmpassword" className="placeholder">
                  Confirm Password
                </label>
              </div>
              <button type="submit" className="form-submit">
                Sign Up
              </button>
            </form>
            <p className="to_login">
              {" "}
              Already have an account?
              <a className=" to_login login-link" href="/login">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
