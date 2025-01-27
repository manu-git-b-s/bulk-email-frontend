import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  // initial values for inputs
  const initialValues = { email: "", password: "" };

  useEffect(() => {
    if (userInfo) {
      navigate("/send-email");
    }
  }, [navigate, userInfo]);

  // validation schema for inputs
  const validationSchema = Yup.object({
    email: Yup.string()
      .email()
      .matches(/^(?!.*@[^,]*,)/)
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // onSubmit handler for login
  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://3.86.235.191/api/users/login",
        values
      );
      if (res.status === 200) {
        setIsLoading(false);
        dispatch(setCredentials(res.data.data));
        navigate("/send-email");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("User does not exist or Invalid Password");
      console.log(error.response);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div
      className=" mx-auto p-5 mt-5 rounded-3"
      style={{ backgroundColor: "#004c91", width: "500px" }}
    >
      <h1 className="text-center mb-4 text-light">Login User</h1>
      <form
        className="p-5 bg-light w-100 mx-auto rounded-3"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.email}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.password}</span>
        </div>
        <div className="d-grid ">
          <button type="submit" className="btn btn-success mt-3">
            {isLoading ? <Loader /> : "Login"}
          </button>
        </div>
        <div className="mt-3">
          <span>You dont have an account ? </span>
          <Link
            className="link-primary text-decoration-underline"
            to="/register"
          >
            Register
          </Link>
        </div>
        <div className="mt-3">
          <Link to="/forgot-password" className="link-danger">
            Forgot Password?{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
