import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./privateRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import OrderManagement from "../pages/Order/Management";
import ItemsList from "../pages/Items/List";
// import Login from "../pages/Login";

// import ProfessionalList from "../pages/Professional/List";
// import Settings from "../pages/Settings";

export default function SwitchRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route
				path="/orders/management"
				element={
					<ProtectedRoute>
						<OrderManagement />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/items/list"
				element={
					<ProtectedRoute>
						<ItemsList />
					</ProtectedRoute>
				}
			/>
			<Route path="*" element={<h1>404 NOT FOUND</h1>} />

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
