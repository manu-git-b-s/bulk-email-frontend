import axios from "axios";
import { FaEnvelope, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";
import { FaPowerOff } from "react-icons/fa6";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "https://bulk-email-backend-mnvn.onrender.com/api/users/logout"
      );
      if (res.status === 200) {
        dispatch(logout());
        toast.success("user logged out");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand iconContainer" href="#">
          Bulk Email Tool <FaEnvelope className="ms-2" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            {userInfo ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link link " to="/send-email">
                    Send Mail
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link " to="/all-mails">
                    All Mails
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link " to="/monthly-mails">
                    Monthly Mails
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link link " onClick={logoutHandler}>
                    Logout <FaPowerOff className="ms-2" />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link link" to="/login">
                    <FaSignInAlt className="me-1" /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link link" to="/register">
                    <FaSignOutAlt className="me-1" /> Register
                  </Link>
                </li>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
