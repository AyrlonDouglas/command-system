export interface TableDataProps {
	id: number;
	name: string;
}

export interface CreateUpdateTableProps {
	payload: { name: string; id?: number };
	type: string;
}
