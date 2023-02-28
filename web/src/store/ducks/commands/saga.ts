import { AxiosResponse, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { CommandCreateActionProps, CommandCreateProps } from "../../../helper/interfaces/Commands";
import { api } from "../../../service/axios";
import { setModalPrimaryOpen } from "../layout/slice";
import {
	commandFail,
	getCommandsRequest,
	getCommandsSuccess,
	createCommandRequest,
	createCommandSuccess,
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

		toast.success(`Comanda de ${payload.requesterName}`);

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

export default function* commandSaga() {
	yield takeLatest(getCommandsRequest().type, getCommands);
	yield takeLatest(createCommandRequest("").type, createCommand);
}
