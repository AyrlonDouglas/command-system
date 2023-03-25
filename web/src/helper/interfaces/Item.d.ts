export interface CreateOrUpdateItemProps {
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

export interface ItemsDataProps {
	id: number;
	name: string;
	description: string;
	price: number;
	avaliable: boolean;
	category: {
		id: number;
		name: string;
	};
}
