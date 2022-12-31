import axios, { AxiosRequestConfig } from "axios";

import { LOCAL } from "../helper/constants/localStorage";

export const api = axios.create({
	baseURL: import.meta.env.VITE_HOST_URL,
});

api.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const token = localStorage.getItem(LOCAL.token) || "";
		// const user_id = localStorage.getItem(LOCAL.userId) || "";

		if (token) {
			config.headers = {
				Authorization: `Bearer ${token}`,
				// user_id: user_id,
			};
		} else {
			delete config.headers?.Authorization;
			// delete config.headers?.user_id;
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
			window.location.href = "/";
		}

		return Promise.reject(error);
	}
);
