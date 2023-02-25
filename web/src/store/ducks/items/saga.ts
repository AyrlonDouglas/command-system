import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { CreateOrUpdateItemProps } from "../../../helper/interfaces/Item";
import { api } from "../../../service/axios";
import {
	getItemsRequest,
	getItemsSuccess,
	createItemRequest,
	createItemSuccess,
	updateItemRequest,
	updateItemSuccess,
	genericItemFail,
} from "./slice";

function* getItems() {
	try {
		const response: AxiosResponse = yield call(api.get, "/item");

		yield put(getItemsSuccess(response.data));
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível buscar items");
		}

		yield put(genericItemFail());
	}
}

function* createItem({ payload }: CreateOrUpdateItemProps) {
	try {
		const response: AxiosResponse = yield call(api.post, "/item", payload);

		yield put(createItemSuccess(response.data));
		toast.success(`Item ${response.data.name} criado!`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível criar item");
		}

		yield put(genericItemFail());
	}
}

function* updateItem({ payload }: CreateOrUpdateItemProps) {
	try {
		const id = payload.id;

		delete payload.id;
		const response: AxiosResponse = yield call(api.patch, `/item/${id}`, payload);

		yield put(updateItemSuccess(response.data));
		toast.success(`Item ${payload.name} atualizado!`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível editar item");
		}

		yield put(genericItemFail());
	}
}

export default function* itemsSaga() {
	yield takeLatest(getItemsRequest().type, getItems);
	yield takeLatest(createItemRequest("").type, createItem);
	yield takeLatest(updateItemRequest("").type, updateItem);
}
