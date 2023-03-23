import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { routesApp } from "../../../helper/constants/routes";
import { createUpdateOrderProps } from "../../../helper/interfaces/Order";
import { navigateSetter } from "../../../routes/NavigateSetter";
import { api } from "../../../service/axios";
// import { setModalPrimaryOpen, setModalSecondaryOpen } from "../layout/slice";
import {
	getOrdersRequest,
	getOrdersSuccess,
	ordersFail,
	createOrderRequest,
	createOrderSuccess,
} from "./slice";

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
function* createOrder({ payload }: { type: string; payload: createUpdateOrderProps }) {
	try {
		const response: AxiosResponse = yield call(api.post, "/order", payload);

		toast.success(`Pedido criado para comanda ${payload.commandId}`);

		navigateSetter(routesApp.orders.list);

		yield put(createOrderSuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível criar o pedido");
		}

		yield put(ordersFail(error));
	}
}

export default function* orderSaga() {
	yield takeLatest(getOrdersRequest().type, getOrders);
	yield takeLatest(createOrderRequest("").type, createOrder);
}
