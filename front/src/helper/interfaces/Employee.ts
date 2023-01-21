export interface employeeDataProps {
	id: number;
	firstName: string;
	lastName: string;
	employeeCode: string;
	email?: string;
	type: "admin" | "standard" | "bot";
	isActive: boolean;
}

export interface createOrUpdateEmployeeProps {
	payload: {
		id?: number;
		firstName: string;
		lastName: string;
		employeeCode: string;
		email?: string;
		type: "admin" | "standard" | "bot";
		isActive: boolean;
	};
	type: string;
}
