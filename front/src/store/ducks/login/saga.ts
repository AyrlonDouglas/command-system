import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { LOCAL } from "../../../helper/constants/localStorage";
import { api } from "../../../service/axios";
import { loginFail, loginRequest, loginSuccess } from "./slice";

type Credentials = {
	payload: { password: string; employeeCode: string };
	type: string;
};

function* login({ payload }: Credentials) {
	try {
		const response: AxiosResponse = yield call(api.post, "/auth/login", payload);
		toast.success("Seja bem-vindo!");

		localStorage.setItem(LOCAL.token, response.data.token);

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

export default function* userSaga() {
	yield takeLatest(loginRequest("").type, login);
	// yield takeLatest(signUpRequest("").type, signUp);
}
