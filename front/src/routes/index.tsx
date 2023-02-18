import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./privateRoute";
import { LOCAL } from "../helper/constants/localStorage";

import OrderManagement from "../pages/Order/Management";
import ItemsList from "../pages/Items/List";
import EmployeesList from "../pages/Employees/List";
import Home from "../pages/Home";
import Login from "../pages/Login";

export default function SwitchRoutes() {
	const token = localStorage.getItem(LOCAL.token);
	return (
		<Routes>
			<Route path="/" element={token ? <Navigate to={"/orders/management"} /> : <Home />} />
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
				path="/items"
				element={
					<ProtectedRoute>
						<ItemsList />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/employees"
				element={
					<ProtectedRoute>
						<EmployeesList />
					</ProtectedRoute>
				}
			/>
			<Route path="*" element={<h1>404 NOT FOUND</h1>} />
		</Routes>
	);
}
