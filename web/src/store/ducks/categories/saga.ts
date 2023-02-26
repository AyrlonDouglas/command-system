import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { createOrUpdateCategoryProps } from "../../../helper/interfaces/Category";
import { api } from "../../../service/axios";
import {
	getCategoriesRequest,
	getCategoriesSuccess,
	createCategoryRequest,
	createCategorySuccess,
	updateCategoryRequest,
	updateCategorySuccess,
	genericCategoryFail,
	removeCategoryRequest,
	removeCategorySuccess,
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

function* removeCategory({ payload }: { payload: number; type: string }) {
	try {
		const response: AxiosResponse = yield call(api.delete, `/category/${payload}`);

		toast.success(`Categoria ${response.data.name} removida!`);

		yield put(removeCategorySuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível remover categoria");
		}

		yield put(genericCategoryFail());
	}
}

export default function* itemsSaga() {
	yield takeLatest(getCategoriesRequest().type, getCategories);
	yield takeLatest(createCategoryRequest("").type, createCategory);
	yield takeLatest(updateCategoryRequest("").type, updateCategory);
	yield takeLatest(removeCategoryRequest("").type, removeCategory);
}
