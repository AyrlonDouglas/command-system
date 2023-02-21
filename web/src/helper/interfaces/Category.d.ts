export interface createOrUpdateCategoryProps {
	payload: {
		name: string;
		id?: number;
	};
	type: string;
}

export interface categoriesDataProps {
	id: number;
	name: string;
}
