import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPassword.jsx";
import ResetPasswordPage from "./pages/ResetPassword.jsx";
import SendEmailPage from "./pages/SendMailPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AllMailsPage from "./pages/AllMailsPage.jsx";
import MonthlyMails from "./pages/MonthlyMails.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/send-email" element={<SendEmailPage />} />
        <Route path="/all-mails" element={<AllMailsPage />} />
        <Route path="/monthly-mails" element={<MonthlyMails />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
