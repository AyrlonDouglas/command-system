import { PermissionProps } from "./Permission";

export interface LoginDataProps {
	token: string;
	employeeCode: string;
	employeeId: number;
	permissions: PermissionProps[];
}

export type CredentialProps = {
	payload: { password: string; employeeCode: string };
	type: string;
};
