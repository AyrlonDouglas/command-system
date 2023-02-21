import { EEmployeeTypes } from "../constants/employee";

export interface employeeDataProps {
	id: number;
	firstName: string;
	lastName: string;
	employeeCode: string;
	email?: string;
	type: EEmployeeTypes;
	isActive: boolean;
}

export interface createOrUpdateEmployeeProps {
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
