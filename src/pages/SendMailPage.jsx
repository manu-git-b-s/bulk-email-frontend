import { useFormik } from "formik";
import * as Yup from "yup";
import { FaRegPaperPlane } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

const SendEmailPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  // initial values for inputs
  const initialValues = { recipients: "", subject: "", message: "" };

  // validation schema for inputs
  const validationSchema = Yup.object({
    recipients: Yup.string().required("Recipeints are required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  // onSubmit handler for send mails page
  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://3.86.235.191/api/mail/send-mail",
        { ...values, email: userInfo.email }
      );
      if (res.status === 201) {
        setIsLoading(false);
        formik.values.message = "";
        formik.values.recipients = "";
        formik.values.subject = "";
        toast.success(res.data.message);
      }
    } catch (error) {
      setIsLoading(false);
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
      className=" mx-auto p-5 mt-5 rounded-3 send-mail-bg"
      style={{ maxWidth: "900px" }}
    >
      <h1 className="text-center mb-4 text-light d-flex justify-content-center align-items-center">
        Send Emails
        <FaRegPaperPlane className="ms-3" />
      </h1>
      <form
        className="p-5 bg-light w-100 mx-auto rounded-3"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            placeholder="Enter your mail Subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.subject}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="recipients" className="form-label">
            To
          </label>
          <textarea
            type="recipients"
            className="form-control"
            id="recipients"
            placeholder="Enter your recipients"
            value={formik.values.recipients}
            onChange={formik.handleChange}
          />
          <div className="form-text">
            Type emails separated by a comma. for eg:abc@gmail.com,xyz@gmail.com
          </div>
          <span className="text-danger">{formik.errors.recipients}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            type="message"
            className="form-control"
            id="message"
            placeholder="Enter your message"
            value={formik.values.message}
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.message}</span>
        </div>

        <div className="d-grid ">
          <button type="submit" className="btn btn-success mt-3">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                Send Email <FaRegPaperPlane />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendEmailPage;
