import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  // initial values for inputs
  const initialValues = { password: "", confirmPassword: "" };

  // validation schema for inputs
  const validationSchema = Yup.object({
    password: Yup.string().min(8).required("Password is required"),
    confirmPassword: Yup.string().min(8).required("Password is required"),
  });

  // onSubmit handler for reset password page
  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      let res = await axios.put(
        "http://3.86.235.191/api/users/reset-password",
        {
          ...values,
          email,
        }
      );
      if (res.status === 200) {
        setIsLoading(false);
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div
      className="mx-auto p-5 mt-5 rounded-3 reset-bg"
      style={{ width: "500px" }}
    >
      <h1 className="text-center mb-4 text-light">Reset Password</h1>
      <form
        className="p-5 bg-light w-100 mx-auto rounded-3"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Enter New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter New password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.password}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.confirmPassword}</span>
        </div>
        <div className="d-grid mt-4">
          <button type="submit" className="btn-success btn">
            {isLoading ? <Loader /> : "Set Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
