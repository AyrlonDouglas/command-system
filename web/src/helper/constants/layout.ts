import { SecondaryMenuProps } from "../interfaces/Layout";
import { routesApp } from "./routes";

export const SecondaryMenu: SecondaryMenuProps[] = [
	{
		path: routesApp.command.list,
		title: "Comandas",
		section: "Pedidos",
		permissionsToAcces: [{ entity: "COMMAND", action: "VIEW" }],
	},
	{
		path: routesApp.table.list,
		title: "Mesas",
		section: "Pedidos",
		permissionsToAcces: [{ entity: "TABLE", action: "VIEW" }],
	},
	{
		path: routesApp.orders.list,
		title: "Pedidos",
		section: "Pedidos",
		permissionsToAcces: [{ entity: "ORDER", action: "VIEW" }],
	},
	{
		path: routesApp.employees.list,
		title: "Profissionais",
		section: "Usuários",
		permissionsToAcces: [{ entity: "EMPLOYEE", action: "VIEW" }],
	},
	{
		path: routesApp.items.list,
		title: "Itens",
		section: "Cardápio",
		permissionsToAcces: [{ entity: "ITEM", action: "VIEW" }],
	},
	{
		path: routesApp.category.list,
		title: "Categorias",
		section: "Cardápio",
		permissionsToAcces: [{ entity: "CATEGORY", action: "VIEW" }],
	},
	{
		path: routesApp.settings.account,
		title: "Conta",
		section: "Configurações",
		permissionsToAcces: [],
	},
	{
		path: routesApp.roles.list,
		title: "Funções",
		section: "Permissões",
		permissionsToAcces: [{ entity: "ROLE", action: "VIEW" }],
	},
];
