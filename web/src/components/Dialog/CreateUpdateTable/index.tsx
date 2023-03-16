import React, { useEffect, useState } from "react";
//MUI
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Unstable_Grid2 as Grid,
} from "@mui/material";

//COMPONENTS
import InputTextFieldControlled from "../../Input/TextFieldControlled";

// REDUX E SAGA

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

//VALIDADOR
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import DialogRemovalConfirmation from "../RemovalConfirmation";
import {
	createTableRequest,
	updateTableRequest,
	removeTableRequest,
} from "../../../store/ducks/tables/slice";

//IMAGE

const schema = yup.object().shape({
	name: yup.string().required("Preencha o nome"),
});

interface DialogCreateEditTableProps {
	open: boolean;
	handleClose: () => void;
	tableId?: number | null;
}

export default function DialogCreateUpdateTable({
	handleClose,
	tableId,
	open,
}: DialogCreateEditTableProps) {
	const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
	const tablesState = useAppSelector((state) => state.tables);

	const dispatch = useAppDispatch();

	const tableFiltered = tablesState.data.filter((table) => table.id === tableId)[0];

	useEffect(() => {
		if (tableId && open) {
			setValue("name", tableFiltered.name);
		}

		return () => reset();
	}, [open]);

	const {
		handleSubmit,
		control,
		getValues,
		formState: { errors, defaultValues },
		// resetField,
		setValue,
		// trigger,
		// watch,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: "" as string,
		},
	});

	const handleItem = (data: typeof defaultValues) => {
		if (tableId && !dataChanged()) {
			toast.warning("Algum dado deve ser mudado para atualizar.");
			return;
		}

		if (!tableId) {
			dispatch(createTableRequest(data));
			return;
		}

		if (tableId && dataChanged()) {
			dispatch(updateTableRequest({ ...data, id: tableFiltered.id }));
			return;
		}
	};

	const dataChanged = () => {
		return getValues().name !== tableFiltered.name;
	};

	const onCloseDeleteConfirmation = () => {
		setOpenDeleteConfirmation(false);
	};
	const onConfirmationDelete = () => {
		dispatch(removeTableRequest(tableId));
		setOpenDeleteConfirmation(false);
	};
	return (
		<Dialog open={open} onClose={handleClose}>
			<form onSubmit={handleSubmit(handleItem)}>
				<DialogTitle>{tableId ? "Editar Mesa" : "Adicionar Mesa"}</DialogTitle>
				<DialogContent>
					<Grid container spacing={2} mt={1}>
						<Grid xs={12}>
							<InputTextFieldControlled control={control} label="Nome da mesa" nameField="name" />
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					{tableId ? (
						<Button
							onClick={() => setOpenDeleteConfirmation(true)}
							variant="contained"
							color="error"
						>
							Remover
						</Button>
					) : null}
					<Button type="submit" disabled={Object.keys(errors).length !== 0} variant="contained">
						{tableId ? "Atualizar" : "Adicionar"}
					</Button>
				</DialogActions>
			</form>
			<DialogRemovalConfirmation
				open={openDeleteConfirmation}
				handleClose={onCloseDeleteConfirmation}
				title={`Tem certeza que deseja remover o item ${getValues("name")}?`}
				subtitle="ESSA AÇÃO É IRREVERSÍVEL!"
				onConfirmation={onConfirmationDelete}
			/>
		</Dialog>
	);
}
