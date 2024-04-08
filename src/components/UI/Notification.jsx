import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "../../redux/Features/alert_slice";
import "./Style.css";

const Notification = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (alert.message) {
      timer = setTimeout(() => dispatch(clearAlert()), 3000);
    }
    return () => clearTimeout(timer);
  }, [alert.message, dispatch]);

  if (!alert.message) return null;

  return <div className={`notification ${alert.type}`}>{alert.message}</div>;
};

export default Notification;
