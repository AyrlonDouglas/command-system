import axios from "axios";

import { LOCAL } from "../helper/constants/localStorage";
import { navigateSetter } from "../routes/NavigateSetter";
import { routesApp } from "../helper/constants/routes";

export const api = axios.create({
	baseURL: import.meta.env.VITE_HOST_URL,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(LOCAL.token) || "";

		if (config.headers) {
			config.headers["ngrok-skip-browser-warning"] = ""; // para ngrok funcionar durante devenvolvimento

			if (token) {
				config.headers.authorization = `Bearer ${token}`;
			} else {
				config.headers.authorization = "";
			}
		}

		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const token = localStorage.getItem(LOCAL.token);

		if (token && error.response.status === 401) {
			localStorage.removeItem(LOCAL.token);
			navigateSetter(routesApp.initial.login);
		}

		return Promise.reject(error);
	}
);
