import { PermissionProps } from "./Permission";

export interface rolePermissionsProps {
	id: number;
	createdAt: Date;
	deletedAt: Date;
	permission: PermissionProps;
}
