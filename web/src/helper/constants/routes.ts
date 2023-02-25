export const routesApp = {
	orders: { list: "/orders" },
	employees: { list: "/employees" },
	items: { list: "/items" },
	category: { list: "/category" },
	settings: { main: "/settings" },
	roles: {
		list: "/roles",
		create: "/roles/create",
		update: (id?: number) => (id ? `/roles/update/${id}` : "/roles/update/:idRole"),
	},
	initial: { main: "/", login: "/login" },
};
