export interface CreateOrUpdateItemProps {
	payload: {
		form: {
			name: string;
			description: string;
			price: number;
			categoryId: number;
			avaliable: boolean;
			file?: File;
		};
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
	imageUrl: string;
	category: {
		id: number;
		name: string;
	};
}
