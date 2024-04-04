import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container my-2">
        <Outlet />
      </div>
    </>
  );
};

export default App;
