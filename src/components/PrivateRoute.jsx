import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Users will be to able to access certain routes only when they are logged in
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
