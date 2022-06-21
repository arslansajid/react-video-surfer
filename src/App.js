import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Application from "./pages/AppRoutes";
import Login from "./pages/Login";
import React from "react";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route index path="/*" element={<Application />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
