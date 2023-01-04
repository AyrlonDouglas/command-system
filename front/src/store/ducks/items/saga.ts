import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../service/axios";
import {
	getItemsFail,
	getItemsRequest,
	getItemsSuccess,
	createItemFail,
	createItemRequest,
	createItemSuccess,
} from "./slice";

function* getItems() {
	try {
		const response: AxiosResponse = yield call(api.get, "/item");

		yield put(getItemsSuccess(response.data));
	} catch (error: unknown) {
		toast.error("Não foi possível buscar items");

		yield put(getItemsFail());
	}
}

interface createItemProps {
	payload: { name: string; description: string; price: number; categoryId: number };
	type: string;
}
function* createItem({ payload }: createItemProps) {
	try {
		const response: AxiosResponse = yield call(api.post, "/item", payload);

		yield put(getItemsRequest());
	} catch (error) {
		toast.error("Não foi possível criar item");

		yield put(createItemFail());
	}
}

export default function* itemsSaga() {
	yield takeLatest(getItemsRequest().type, getItems);
	yield takeLatest(createItemRequest("").type, createItem);
}
