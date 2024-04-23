import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthState } from "../../redux/Features/user_slice";

const PrivateRoutes = () => {
  const loggedIn = useSelector((rootState) => getAuthState(rootState).loggedIn);
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
