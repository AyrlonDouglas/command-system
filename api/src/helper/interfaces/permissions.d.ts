export interface PermissionProps {
  entity: EntitiesTypes;
  action: PermissionsActionTypes;
}

export type PermissionsActionTypes = 'VIEW' | 'CREATE' | 'EDIT' | 'REMOVE';
export type EntitiesTypes =
  | 'CATEGORY'
  | 'COMMAND'
  | 'COMPANY'
  | 'EMPLOYEE'
  | 'ITEM'
  | 'ORDER'
  | 'ORDER-ITEM'
  | 'PERMISSION'
  | 'ROLE'
  | 'ROLE-PERMISSION'
  | 'TABLE';
