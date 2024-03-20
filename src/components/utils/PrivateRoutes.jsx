import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthState } from "../../redux/Features/user_slice";

const PrivateRoutes = () => {
  const { loggedIn } = useSelector(getAuthState);
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
