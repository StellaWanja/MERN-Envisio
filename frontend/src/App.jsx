import "@fontsource-variable/mulish";
import "./styles/index.css";

import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import TeamPage from "./pages/TeamPage/TeamPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Onboarding from "./pages/Onboarding/Onboarding";
import Signup from "./pages/Onboarding/Signup/Signup";
import Login from "./pages/Onboarding/Login/Login";
import ForgotPassword from "./pages/Onboarding/PasswordChange/ForgotPassword";
import ResetPassword from "./pages/Onboarding/PasswordChange/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import PatientData from "./pages/Patient/PatientData/PatientData";
import Prediction from "./pages/Prediction/Prediction";
import Result from "./pages/Prediction/Result/Result";
import AddNewPatient from "./pages/Patient/AddPatient/AddPatient";

function App() {
  return (
    <div className="App">
      <div className="container d-flex align-items-center flex-column">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/teampage" element={<TeamPage />} />
          <Route exact path="/contactpage" element={<ContactPage />} />
          <Route exact path="/onboarding" element={<Onboarding />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/patient-data" element={<PatientData />} />
          <Route exact path="/prediction" element={<Prediction />} />
          <Route exact path="/prediction-result" element={<Result />} />
          <Route exact path='/add-patient' element={<AddNewPatient/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
