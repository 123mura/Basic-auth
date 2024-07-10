import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { UserProvider, UserContext } from "./context/UserContext";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/register" element={<RegisterWrapper />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

function LoginWrapper() {
  const { user } = React.useContext(UserContext);
  return user ? <Navigate to="/" /> : <Login />;
}

function RegisterWrapper() {
  const { user } = React.useContext(UserContext);
  return user ? <Navigate to="/" /> : <Register />;
}

export default App;
