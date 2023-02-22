import { rolePermissionsProps } from "./RolePermissions";

export interface rolesDataProps {
	id: number;
	name: string;
	rolePermissions: rolePermissionsProps[];
}

export interface CreateRolesProps {
	payload: { name: string; permissionsIds: number[] };
	type: string;
}
