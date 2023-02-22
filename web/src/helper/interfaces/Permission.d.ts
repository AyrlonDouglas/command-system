export interface PermissionProps {
	id?: number;
	entity: PermissionEntitiesTypes;
	action: PermissionsActionTypes;
	createdAt?: Date;
	deletedAt?: Date | null;
	updatedAt?: Date;
}

export type PermissionsActionTypes = "VIEW" | "CREATE" | "EDIT" | "REMOVE";

export type PermissionEntitiesTypes =
	| "CATEGORY"
	| "COMMAND"
	| "COMPANY"
	| "EMPLOYEE"
	| "ITEM"
	| "ORDER"
	| "ORDER-ITEM"
	| "PERMISSION"
	| "ROLE"
	| "ROLE-PERMISSION"
	| "TABLE";
