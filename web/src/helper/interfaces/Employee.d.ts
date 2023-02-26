import { EEmployeeTypes } from "../constants/employee";
import { RolesDataProps } from "./Roles";

export interface EmployeeDataProps {
	id: number;
	firstName: string;
	lastName: string;
	employeeCode: string;
	email?: string;
	isActive: boolean;
	role: RolesDataProps;
}

export interface CreateOrUpdateEmployeeProps {
	payload: {
		id?: number;
		firstName: string;
		lastName: string;
		employeeCode: string;
		email?: string;
		type: EEmployeeTypes;
		isActive: boolean;
	};
	type: string;
}

export interface ChangePassProps {
	payload: {
		oldPass: string;
		newPass: string;
		newPassConfirm?: string;
	};
	type: string;
}
