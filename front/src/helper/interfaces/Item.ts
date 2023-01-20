export interface createOrUpdateItemProps {
	payload: {
		name: string;
		description: string;
		price: number;
		categoryId: number;
		avaliable: boolean;
		id?: number;
	};
	type: string;
}
