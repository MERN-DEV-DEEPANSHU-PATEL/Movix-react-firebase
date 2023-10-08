import { useSelector, useMemo } from "react";
import "./style.css";

const Alert = () => {
  const { alertType, alertText } = useSelector((state) => state.user);

  const memoizedAlert = useMemo(() => {
    return <div className={`alert alert-${alertType}`}>{alertText}</div>;
  }, [alertType, alertText]);

  return memoizedAlert;
};

export default Alert;
