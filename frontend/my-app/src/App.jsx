import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Auth/Signup/Signup.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
