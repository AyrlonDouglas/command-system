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
	removeItemRequest,
	removeItemSuccess,
	getItemPictureSuccess,
	getItemPictureFail,
	getItemPictureRequest,
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

function* removeItem({ payload }: { payload: number; type: string }) {
	try {
		const response: AxiosResponse = yield call(api.delete, `/item/${payload}`);

		toast.success(`Item ${response.data.name} removido`);

		yield put(removeItemSuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível remover item");
		}

		yield put(genericItemFail());
	}
}

function* getItemPicture({ payload }: { payload: number; type: string }) {
	try {
		const response: AxiosResponse = yield call(api.get, `/item/picture/${payload}`);

		// console.log(response.data);

		// console.log(response.data.arrayBuffer());

		const file = new Blob([response.data], { type: "image/jpeg" });
		const fileURL = URL.createObjectURL(file);
		window.open(fileURL);

		// console.log("te", response.data);

		yield put(getItemPictureSuccess({ picture: response.data, id: payload }));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível obter imagem do item");
		}

		yield put(getItemPictureFail());
	}
}

export default function* itemsSaga() {
	yield takeLatest(getItemsRequest().type, getItems);
	yield takeLatest(createItemRequest("").type, createItem);
	yield takeLatest(updateItemRequest("").type, updateItem);
	yield takeLatest(removeItemRequest("").type, removeItem);
	yield takeLatest(getItemPictureRequest("").type, getItemPicture);
}
