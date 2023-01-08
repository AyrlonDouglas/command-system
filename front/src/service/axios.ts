import axios, { AxiosRequestConfig } from "axios";

import { LOCAL } from "../helper/constants/localStorage";

export const api = axios.create({
	baseURL: import.meta.env.VITE_HOST_URL,
});

api.interceptors.request.use(
	(config: AxiosRequestConfig<any>) => {
		const token = localStorage.getItem(LOCAL.token) || "";

		if (token) {
			config.headers.set("authorization", `Bearer ${token}`);
		} else {
			config.headers.set("authorization", "");
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const token = localStorage.getItem(LOCAL.token);

		if (token && error.response.status === 401) {
			localStorage.removeItem(LOCAL.token);
			window.location.href = "/login";
		}

		return Promise.reject(error);
	}
);
