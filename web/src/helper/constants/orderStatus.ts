import { OrderStatusType } from "../interfaces/Order";

export const optionsOrderStatus: { text: string; key: OrderStatusType; id: number }[] = [
	{ id: 1, text: "Confirmado", key: "confirmed" },
	{ id: 2, text: "Entregue", key: "delivered" },
	{ id: 3, text: "Em preparo", key: "in_preparation" },
	{ id: 4, text: "Pronto", key: "ready" },
	{ id: 5, text: "Recusado", key: "refused" },
	{ id: 6, text: "Aguardando", key: "waiting" },
];
