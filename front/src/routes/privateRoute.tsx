import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LOCAL } from "../helper/constants/localStorage";

interface IProtectedRoute {
	isAllowed?: boolean;
	redirectPath?: string;
	children: JSX.Element;
}

export default function ProtectedRoute({
	isAllowed = true,
	redirectPath = "/",
	children,
}: IProtectedRoute): JSX.Element {
	const hasToken = !!localStorage.getItem(LOCAL.token);

	if (!hasToken) {
		return <Navigate to={"/login"} replace />;
	} else if (!isAllowed) {
		return <Navigate to={redirectPath} replace />;
	} else {
		return children ? children : <Outlet />;
	}
}
