export interface CreateOrUpdateItemProps {
	payload: {
		name: string;
		description: string;
		price: number;
		categoryId: number;
		avaliable: boolean;
		file?: File;
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
	imageName: string;
	image?: Buffer;
	category: {
		id: number;
		name: string;
	};
}
