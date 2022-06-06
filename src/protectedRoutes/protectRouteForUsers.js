import { Routes, Route, Navigate } from "react-router-dom";
import Addtask from "../pages/Addtask";

const ProtectRouteForUsers = () => {
  console.log("logged", isLoggedIn);

  return (
    <Routes>
      <Route
        path="/"
        render={(props) => {
          if (isLoggedIn) {
            return <Addtask />;
          } else if (!isLoggedIn) {
            return <Navigate to="/login" />;
          }
        }}
      />
    </Routes>
  );
};

export default ProtectRouteForUsers;
