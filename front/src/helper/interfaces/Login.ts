export interface loginDataProps {
	token: string;
	employeeCode: string;
	employeeId: number;
}

export type CredentialProps = {
	payload: { password: string; employeeCode: string };
	type: string;
};
