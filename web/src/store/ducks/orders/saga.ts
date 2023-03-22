import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../service/axios";
// import { setModalPrimaryOpen, setModalSecondaryOpen } from "../layout/slice";
import { getOrdersRequest, getOrdersSuccess, ordersFail } from "./slice";

function* getOrders() {
	try {
		const response: AxiosResponse = yield call(api.get, "/order");

		yield put(getOrdersSuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível buscar pedidos");
		}

		yield put(ordersFail(error));
	}
}

export default function* orderSaga() {
	yield takeLatest(getOrdersRequest().type, getOrders);
}
