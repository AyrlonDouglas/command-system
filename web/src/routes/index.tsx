import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./privateRoute";
import { LOCAL } from "../helper/constants/localStorage";

import { routesApp } from "../helper/constants/routes";

import OrderManagement from "../pages/Order/Management";
import ItemsList from "../pages/Items/List";
import EmployeesList from "../pages/Employees/List";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RoleList from "../pages/Role/list";
import RoleCreateUpdate from "../pages/Role/createUpdate";
import CategoryList from "../pages/Category/List";
import Settings from "../pages/Settings";
import ChangePassword from "../pages/Settings/ChangePassword";
import CommandList from "../pages/Command/List";
export default function SwitchRoutes() {
	const token = localStorage.getItem(LOCAL.token);

	return (
		<Routes>
			<Route
				path={routesApp.initial.main}
				element={token ? <Navigate to={routesApp.orders.list} /> : <Home />}
			/>
			<Route
				path={routesApp.initial.login}
				element={token ? <Navigate to={routesApp.orders.list} /> : <Login />}
			/>

			{/* orders */}
			<Route
				path={routesApp.orders.list}
				element={
					<ProtectedRoute>
						<OrderManagement />
					</ProtectedRoute>
				}
			/>
			<Route
				path={routesApp.orders.command.list}
				element={
					<ProtectedRoute>
						<CommandList />
					</ProtectedRoute>
				}
			/>

			{/* items */}
			<Route
				path={routesApp.items.list}
				element={
					<ProtectedRoute>
						<ItemsList />
					</ProtectedRoute>
				}
			/>

			{/* employee */}
			<Route
				path={routesApp.employees.list}
				element={
					<ProtectedRoute>
						<EmployeesList />
					</ProtectedRoute>
				}
			/>

			{/* roles */}
			<Route
				path={routesApp.roles.list}
				element={
					<ProtectedRoute>
						<RoleList />
					</ProtectedRoute>
				}
			/>
			<Route
				path={routesApp.roles.create}
				element={
					<ProtectedRoute>
						<RoleCreateUpdate />
					</ProtectedRoute>
				}
			/>
			<Route
				path={routesApp.roles.update()}
				element={
					<ProtectedRoute>
						<RoleCreateUpdate />
					</ProtectedRoute>
				}
			/>

			{/* category */}
			<Route
				path={routesApp.category.list}
				element={
					<ProtectedRoute>
						<CategoryList />
					</ProtectedRoute>
				}
			/>

			{/* settings */}
			<Route
				path={routesApp.settings.account}
				element={
					<ProtectedRoute>
						<Settings />
					</ProtectedRoute>
				}
			/>
			<Route
				path={routesApp.settings.changePassword}
				element={
					<ProtectedRoute>
						<ChangePassword />
					</ProtectedRoute>
				}
			/>

			<Route path="*" element={<h1>404 NOT FOUND</h1>} />
		</Routes>
	);
}
