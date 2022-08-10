import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/Signup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import Addtask from "./pages/Addtask";
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import Addtask from './pages/Addtask';
import { Authenticated } from './pages/isAuthenticated';
import Paragraph from './pages/Paragraph';

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={Authenticated() || isLoggedIn ? <Addtask /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/paragraph" element={<Paragraph />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
