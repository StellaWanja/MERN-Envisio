import { useNavigate } from "react-router-dom";

import ListBar from "../../components/ListBar/ListBar";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import Footer from "../../components/Footer/Footer";
import "../../styles/index.css";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const routeChange = () => {
    let path = `/onboarding`;
    navigate(path);
  };

  return (
    <>
      <div className="main" id="top">
        <div>
          <TopNavigation />
        </div>

        <div className="welcome">
          <div className="intro">
            <div className="headline">
              <h1 className="heading">
                Automated tests to <br />
                save time on <br />
                diagnosis.
              </h1>

              <p
                className="motto"
                style={{
                  paddingTop: "15px",
                  paddingBottom: "50px",
                  color: "#7A7A7A",
                  fontSize: "20px",
                }}
              >
                Predictions that never fail.
              </p>
            </div>

            <div className="start-button">
              <button
                className="get-started"
                type="submit"
                onClick={routeChange}
              >
                Get Started
              </button>
            </div>
          </div>

          <img
            src="https://i.ibb.co/9HfjXmj/trafalgar-illustration-sec02-2.png"
            alt="welcome-healthcare-providers"
            className="landing-image"
          />
        </div>

        <div className="about-section" id="about">
          <h2>About Envisio.</h2>
          <p className="about-content">
            The advent of the pandemic covid-19 made the world revisit the issue
            of inadequacies in it’s health sector. It is with <br /> same
            initiative in mind that we have created this product to rid the
            world of uncertainties where health is concerned <br /> and promote
            the usage of technology in achieving this goal. This model will
            predict a near-accurate possibility of <br /> breast cancer in women
            by taking inputs from mammogram test results to determine <br />{" "}
            whether a tumour is benign or malignant.
          </p>
        </div>

        <div className="how-it-works">
          <div>
            <h2 className="h-i-t-heading">How It Works</h2>
          </div>

          <div className="content-wrapper">
            <div className="content-container">
              <img
                src="https://i.ibb.co/2F05Sf4/bulb.png"
                className="vector"
                alt="early prediction"
              />
              <h3 className="content-heading">Early Prediction</h3>
              <p className="content-body">
                Get early predictions on breast cancer to ensure early
                treatment.
              </p>
            </div>

            <div className="content-container">
              <img
                src="https://i.ibb.co/9b8gFGv/time.png"
                className="vector time"
                alt="save time"
              />
              <h3 className="content-heading">Save time</h3>
              <p className="content-body">
                Our model provides quicker results, saves time and cost of
                running tests.
              </p>
            </div>

            <div className="content-container">
              <img
                src="https://i.ibb.co/bbwJBXH/storage.png"
                className="vector"
                alt="data storage"
              />
              <h3 className="content-heading">Data Storage</h3>
              <p className="content-body">
                Have access to your patients’ history with for easy reference
                and referal.
              </p>
            </div>
          </div>
        </div>

        <div className="blob">
          <div className="product background" id="our-product">
            <h2 className="product-heading">Our Product.</h2>
            <img
              src="https://i.ibb.co/sQTshzY/DASHBOARD-HIFI.png"
              alt="product-dashboard"
              className="product-image"
            />
          </div>
        </div>

        <div>
          <ListBar />
        </div>

        <div className="users-section">
          <div className="user-1">
            <h2 className="who-can">Who Can Use Envisio?</h2>
            <img
              src="https://i.ibb.co/VN1gb99/illustration.png"
              alt="healthcare-providers"
              className="healthcare-providers"
            />
            <div className="healthcare-container">
              <h3 className="who-can-head">Healthcare Providers</h3>
              <div className="grey-bar">
                <img src="https://i.ibb.co/1Zyh1d4/grey-bar.png" alt="bar" />
              </div>

              <p className="who-can-desc">
                The platform serves as an AI asistant for all <br /> healthcare
                providers in detecting breast cancer in <br /> patients early
                and easily.
              </p>
              <div className="signup-button start-button">
                <button className="signup" type="submit" onClick={routeChange}>
                  Sign Me Up
                </button>
              </div>
            </div>
          </div>

          <div className="user-2">
            <div className="medical-container">
              <h3 className="who-can-head">Registered Medical Centers</h3>
              <div className="grey-bar">
                <img src="https://i.ibb.co/1Zyh1d4/grey-bar.png" alt="bar" />
              </div>

              <p className="who-can-desc">
                With the data storage system, this platform also <br /> serves
                as a management system for already existing <br /> medical
                centers. Ensuring a decentralized access to <br /> authorized
                personnel associated with the centers.
              </p>
              <div className="signup-button start-button">
                <button className="signup" type="submit" onClick={routeChange}>
                  Sign Me Up
                </button>
              </div>
            </div>

            <img
              className="medical"
              src="https://i.ibb.co/VxZL0QC/trafalgar-illustration-sec03-1.png"
              alt="healthcare-providers"
            />
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
