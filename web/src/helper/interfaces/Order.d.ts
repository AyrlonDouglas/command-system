import { CommandDataProps } from "./Commands";
import { OrderItemsDataProps } from "./OrderItems";
import { TableDataProps } from "./Table";

export interface OrderDataProps {
	id: number;
	amount: number;
	canceled: boolean;
	command: Partial<CommandDataProps>;
	table: TableDataProps;
	status: string;
	orderItems: OrderItemsDataProps[];
}

export interface createUpdateOrderProps {
	id?: number;
	status?: OrderStatusType;
	items: { id: number; quantity: number }[];
	commandId: number;
}

export type OrderStatusType =
	| "waiting"
	| "confirmed"
	| "in_preparation"
	| "ready"
	| "delivered"
	| "refused";
