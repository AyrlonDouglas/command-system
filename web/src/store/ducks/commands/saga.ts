import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { CommandCreateActionProps, CommandCreateProps } from "../../../helper/interfaces/Commands";
import { api } from "../../../service/axios";
import { setModalPrimaryOpen, setModalSecondaryOpen } from "../layout/slice";
import {
	commandFail,
	getCommandsRequest,
	getCommandsSuccess,
	createCommandRequest,
	createCommandSuccess,
	updateCommandRequest,
	updateCommandSuccess,
	deleteCommandRequest,
	deleteCommandSuccess,
} from "./slice";

function* getCommands() {
	try {
		const response: AxiosResponse = yield call(api.get, "/command");

		yield put(getCommandsSuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível buscar comandas");
		}

		yield put(commandFail());
	}
}
function* createCommand({ payload }: CommandCreateActionProps) {
	try {
		const dataPayload = {
			...payload,
			requesterCPF: Number(payload.requesterCPF),
		} as CommandCreateProps;

		const response: AxiosResponse = yield call(api.post, "/command", dataPayload);

		yield put(setModalPrimaryOpen(false));

		toast.success(`Comanda de ${payload.requesterName} criada.`);

		yield put(createCommandSuccess(response.data));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível criar comanda");
		}

		yield put(commandFail());
	}
}

function* updateCommand({ payload }: CommandCreateActionProps) {
	const id = payload.id;
	delete payload.id;

	try {
		const response: AxiosResponse = yield call(api.patch, `/command/${id}`, payload);

		toast.success(`Comanda de ${payload.requesterName} editada`);

		yield put(updateCommandSuccess(response.data));
		yield put(setModalPrimaryOpen(false));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível atualizar comanda");
		}

		yield put(commandFail());
	}
}

function* deleteCommand({ payload }: { type: string; payload: number }) {
	const id = payload;
	try {
		yield call(api.delete, `/command/${id}`);

		yield put(deleteCommandSuccess({ id }));
		yield put(setModalPrimaryOpen(false));
		yield put(setModalSecondaryOpen(false));
	} catch (error) {
		if (isAxiosError(error)) {
			toast.error(error.response?.data.message);
		} else {
			toast.error("Não foi possível remover comanda");
		}

		yield put(commandFail());
	}
}

export default function* commandSaga() {
	yield takeLatest(getCommandsRequest().type, getCommands);
	yield takeLatest(createCommandRequest("").type, createCommand);
	yield takeLatest(updateCommandRequest("").type, updateCommand);
	yield takeLatest(deleteCommandRequest("").type, deleteCommand);
}
