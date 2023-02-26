import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { LOCAL } from "../../../helper/constants/localStorage";
import { routesApp } from "../../../helper/constants/routes";
import { LoginProps } from "../../../helper/interfaces/Login";
import { navigateSetter } from "../../../routes/NavigateSetter";
import { api } from "../../../service/axios";
import {
	loginFail,
	loginRequest,
	loginSuccess,
	recoverLoginRequest,
	recoverLoginSuccess,
} from "./slice";

function* login({ payload: { credentials, navigate } }: LoginProps) {
	try {
		const response: AxiosResponse = yield call(api.post, "/auth/login", credentials);
		toast.success("Seja bem-vindo!");

		localStorage.setItem(LOCAL.token, response.data.token);
		localStorage.setItem(LOCAL.permissions, JSON.stringify(response.data.permissions));

		navigateSetter(routesApp.orders.list);

		yield put(loginSuccess(response.data));
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível realizar login");
		}

		localStorage.setItem(LOCAL.token, "");
		yield put(loginFail());
	}
}

function* recoveryDataLogin() {
	try {
		const response: AxiosResponse = yield call(api.get, "/auth/login");

		localStorage.setItem(LOCAL.permissions, JSON.stringify(response.data.permissions));

		yield put(recoverLoginSuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível recuperar dados do login");
		}

		yield put(loginFail());
	}
}

export default function* userSaga() {
	yield takeLatest(loginRequest("").type, login);
	yield takeLatest(recoverLoginRequest().type, recoveryDataLogin);
}
