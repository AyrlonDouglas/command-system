import { PermissionProps } from "./Permission";

export interface RolePermissionsProps {
	id: number;
	createdAt: Date;
	deletedAt: Date;
	permission: PermissionProps;
}
