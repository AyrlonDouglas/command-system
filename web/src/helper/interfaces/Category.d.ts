export interface createOrUpdateCategoryProps {
	payload: {
		name: string;
		id?: number;
	};
	type: string;
}

export interface CategoriesDataProps {
	id: number;
	name: string;
}
