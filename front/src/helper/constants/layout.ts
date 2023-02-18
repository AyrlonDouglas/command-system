import { SecondaryMenuProps } from "../interfaces/Layout";

export const SecondaryMenu: SecondaryMenuProps[] = [
	{
		path: "/orders/management",
		title: "Comandas",
		section: "Comandas",
		permissionsToAcces: [{ entity: "COMMAND", action: "VIEW" }],
	},
	{
		path: "/employees",
		title: "Profissionais",
		section: "Usuários",
		permissionsToAcces: [{ entity: "EMPLOYEE", action: "VIEW" }],
	},
	{
		path: "/items",
		title: "Itens",
		section: "Cardápio",
		permissionsToAcces: [{ entity: "ITEM", action: "VIEW" }],
	},
	{
		path: "/category",
		title: "Categorias",
		section: "Cardápio",
		permissionsToAcces: [{ entity: "CATEGORY", action: "VIEW" }],
	},
	{
		path: "/settings",
		title: "Configurações",
		section: "Configurações",
		permissionsToAcces: [],
	},
	{
		path: "/roles",
		title: "Funções",
		section: "Configurações",
		permissionsToAcces: [{ entity: "ROLE", action: "VIEW" }],
	},
];
