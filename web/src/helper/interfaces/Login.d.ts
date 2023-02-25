import { NavigateFunction } from "react-router-dom";
import { PermissionProps } from "./Permission";

export interface LoginDataProps {
	token: string;
	employeeCode: string;
	employeeId: number;
	permissions: PermissionProps[];
}

export type LoginProps = {
	payload: {
		credentials: { password: string; employeeCode: string };
		navigate: NavigateFunction;
	};
	type: string;
};
