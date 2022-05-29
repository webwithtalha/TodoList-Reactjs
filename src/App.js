import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Addtask from "./pages/Addtask";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Addtask />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
