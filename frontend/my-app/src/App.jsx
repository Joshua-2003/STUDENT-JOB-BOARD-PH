import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";

import Signup from "./pages/Auth/Signup/Signup.jsx";
import Login from "./pages/Auth/Login/Login.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard.jsx";
import StudentsList from "./pages/Admin/StudentsList.jsx";

// Student Pages
import StudentDashboard from "./pages/Student/Home.jsx";

// Employer Pages
import EmployerDashboard from "./pages/Employer/Home.jsx";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          <Route
            path="/students-list"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <StudentsList />
              </ProtectedRoute>
            }
          />

          {/* Student routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Employer routes */}
          <Route
            path="/employer"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYER"]}>
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
