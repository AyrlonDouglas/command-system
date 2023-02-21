import { PermissionProps } from "./Permission";

export interface loginDataProps {
	token: string;
	employeeCode: string;
	employeeId: number;
	permissions: PermissionProps[];
}

export type CredentialProps = {
	payload: { password: string; employeeCode: string };
	type: string;
};
