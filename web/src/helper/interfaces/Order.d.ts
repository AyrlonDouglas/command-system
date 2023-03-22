import { CommandDataProps } from "./Commands";
import { TableDataProps } from "./Table";

export interface OrderDataProps {
	id: number;
	amount: number;
	canceled: boolean;
	command: Partial<CommandDataProps>;
	table: TableDataProps;
	status: string;
}

export type OrderStatusType =
	| "waiting"
	| "confirmed"
	| "in_preparation"
	| "ready"
	| "delivered"
	| "refused";
