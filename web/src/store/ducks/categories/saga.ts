import { AxiosResponse, isAxiosError, AxiosError } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { createOrUpdateCategoryProps } from "../../../helper/interfaces/Category";
import { navigateSetter } from "../../../routes/NavigateSetter";
import { api } from "../../../service/axios";
import {
	getCategoriesRequest,
	getCategoriesSuccess,
	createCategoryRequest,
	createCategorySuccess,
	updateCategoryRequest,
	updateCategorySuccess,
	genericCategoryFail,
} from "./slice";

function* getCategories() {
	try {
		const response: AxiosResponse = yield call(api.get, "/category");

		yield put(getCategoriesSuccess(response.data));
	} catch (error: unknown) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível buscar categories");
		}

		yield put(genericCategoryFail());
	}
}

function* createCategory({ payload }: createOrUpdateCategoryProps) {
	try {
		const response: AxiosResponse = yield call(api.post, "/category", payload);

		yield put(createCategorySuccess(response.data));
		toast.success(`Categoria ${response.data.name} criada!`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível criar categoria");
		}

		yield put(genericCategoryFail());
	}
}

function* updateCategory({ payload }: createOrUpdateCategoryProps) {
	try {
		const id = payload.id;
		delete payload.id;

		const response: AxiosResponse = yield call(api.patch, `/category/${id}`, payload);

		yield put(updateCategorySuccess(response.data));
		toast.success(`Categoria ${response.data.name} Atualizada!`);
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível atualizar categoria");
		}

		yield put(genericCategoryFail());
	}
}

export default function* itemsSaga() {
	yield takeLatest(getCategoriesRequest().type, getCategories);
	yield takeLatest(createCategoryRequest("").type, createCategory);
	yield takeLatest(updateCategoryRequest("").type, updateCategory);
}
