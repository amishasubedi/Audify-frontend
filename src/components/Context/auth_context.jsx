import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  setLoggedIn,
  updateLoggedInState,
  updateProfile,
} from "../../redux/Features/user_slice";
import { useIsAuthQuery } from "../../redux/Services/api_service";

const AuthContextComponent = () => {
  const { data, isLoading, isSuccess, isError } = useIsAuthQuery();
  const { loggedIn } = useSelector(getAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(updateProfile(data.profile));
      dispatch(updateLoggedInState(true));
    } else if (isError) {
      dispatch(updateProfile(""));
      dispatch(setLoggedIn(false));
    }
  }, [dispatch, isSuccess, isError, data]);

  if (isLoading) {
    return <div>Loading authentication status...</div>;
  }

  return (
    <div>
      {loggedIn ? (
        <div>User is logged in</div>
      ) : (
        <div>User is not logged in</div>
      )}
    </div>
  );
};

export default AuthContextComponent;
