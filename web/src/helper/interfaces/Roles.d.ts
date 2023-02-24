import { RolePermissionsProps } from "./RolePermissions";

export interface RolesDataProps {
	id: number;
	name: string;
	rolePermissions: RolePermissionsProps[];
}

export interface CreateUpdateRolesProps {
	payload: { name: string; permissionsIds: number[]; id?: number };
	type: string;
}
