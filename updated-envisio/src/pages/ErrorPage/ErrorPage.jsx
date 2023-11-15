import LeftSideBar from "../../components/Sidebar/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/Sidebar/RightSideBar/RightSideBar";

const ErrorPage = () => {
  return <div className="dashboard-container">
            <LeftSideBar />
            <h1>Oh... oh...</h1>
            <h3>Page does not exist</h3>
            <RightSideBar />

  </div>;
};

export default ErrorPage;
