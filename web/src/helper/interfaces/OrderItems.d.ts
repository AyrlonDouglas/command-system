import { ItemsDataProps } from "./Item";

export interface OrderItemsDataProps {
	id: number;
	quantity: number;
	item: ItemsDataProps;
	createdAt: Date;
	deletedAt: Date;
	updatedAt: Date;
}
