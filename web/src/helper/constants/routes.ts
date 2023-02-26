export const routesApp = {
	orders: { list: "/orders", command: { list: "/order/command" } },
	employees: { list: "/employees" },
	items: { list: "/items" },
	category: { list: "/category" },
	settings: { account: "/settings/account", changePassword: "/settings/account/changePassword" },
	roles: {
		list: "/roles",
		create: "/roles/create",
		update: (id?: number) => (id ? `/roles/update/${id}` : "/roles/update/:idRole"),
	},
	initial: { main: "/", login: "/login" },
};
