import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./privateRoute";
import Home from "../pages/home";

// import Login from "../pages/Login";

// import ProfessionalList from "../pages/Professional/List";
// import Settings from "../pages/Settings";

export default function SwitchRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			{/* <Route path="/login" element={<Login />} /> */}
			{/* <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/professional"
        element={
          <ProtectedRoute>
            <ProfessionalList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      /> */}
		</Routes>
	);
}
