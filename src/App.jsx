import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Dashboard } from "./pages/components/dashboard";
import { Home } from "./pages/components/Home";
import { Login } from "./pages/components/login";
import { Register } from "./pages/components/register";

const storedUser = localStorage.getItem("user");

const user = storedUser ? JSON.parse(storedUser) : null; // get logged in user

export function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user?.role === "ADMIN" ? (
              <Navigate to="/dashboard" />
            ) : user?.role === "USER" ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected routes */}
        <Route
          path="/home"
          element={
            user && user.role === "USER" ? <Home /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/dashboard"
          element={
            user && user.role === "ADMIN" ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}
