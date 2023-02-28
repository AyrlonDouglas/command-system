import { TableDataProps } from "./Table";

export interface CommandDataProps {
	id: number;
	isActive: boolean;
	requesterCPF: string;
	requesterName: string;
	totalCost: number;
	orders: [];
	table: TableDataProps;
}

export interface CommandCreateActionProps {
	type: string;
	payload: CommandCreateProps;
}

export interface CommandCreateProps {
	requesterCPF: number;
	requesterName: string;
	tableId?: number;
}
