import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { LOCAL } from "../../../helper/constants/localStorage";
import { CredentialProps } from "../../../helper/interfaces/Login";
import { api } from "../../../service/axios";
import {
	loginFail,
	loginRequest,
	loginSuccess,
	recoverLoginRequest,
	recoverLoginSuccess,
} from "./slice";

function* login({ payload }: CredentialProps) {
	try {
		const response: AxiosResponse = yield call(api.post, "/auth/login", payload);
		toast.success("Seja bem-vindo!");

		localStorage.setItem(LOCAL.token, response.data.token);
		localStorage.setItem(LOCAL.permissions, JSON.stringify(response.data.permissions));

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
