import React, { useEffect } from "react";
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
import {
	createCommandRequest,
	updateCommandRequest,
	deleteCommandRequest,
} from "../../../store/ducks/commands/slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setModalSecondaryOpen } from "../../../store/ducks/layout/slice";

//VALIDADOR
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import DialogRemovalConfirmation from "../RemovalConfirmation";
//utils
import { cpfIsValid } from "../../../utils/cpf.util";

const schema = yup.object().shape({
	requesterCPF: yup
		.string()
		.required("Preencha o seu CPF")
		.test("teste-invalid-cpf", "Adicione um CPF válido", (cpf) => cpfIsValid(cpf)),
	requesterName: yup.string().required("Preencha o seu nome"),
});

interface DialogCreateEditCommandProps {
	open: boolean;
	handleClose: () => void;
	commandId?: number | null;
}

export default function DialogCreateUpdateCommand({
	handleClose,
	open,
	commandId,
}: DialogCreateEditCommandProps) {
	const dispatch = useAppDispatch();

	// const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
	const commandState = useAppSelector((state) => state.commands);
	const openDeleteConfirmation = useAppSelector((state) => state.layout.modals.secondary);

	const commandFiltered = commandState.data.filter((command) => command.id === commandId)[0];

	useEffect(() => {
		if (commandId && open) {
			setValue("requesterCPF", commandFiltered.requesterCPF);
			setValue("requesterName", commandFiltered.requesterName);
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
			requesterName: "" as string,
			requesterCPF: "" as string | number,
		},
	});

	const onClose = () => {
		handleClose();
		reset();
	};
	const onCloseDeleteConfirmation = () => {
		dispatch(setModalSecondaryOpen(false));
	};
	const onConfirmationDelete = () => {
		dispatch(deleteCommandRequest(commandId));
	};

	const onSubmit = (data: typeof defaultValues) => {
		const requesterCPF = Number(data?.requesterCPF);

		if (!commandId) {
			dispatch(createCommandRequest(data));
		}

		if (commandId && dataChanged(data)) {
			dispatch(updateCommandRequest({ ...data, requesterCPF, id: commandId }));
		}

		if (!dataChanged(data)) {
			toast.warning("Nenhum dado foi editado");
		}
	};

	const dataChanged = (data: typeof defaultValues) => {
		return (
			commandFiltered.requesterCPF !== data?.requesterCPF ||
			commandFiltered.requesterName !== data.requesterName
		);
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogTitle>{commandId ? "Editar Comand" : "Adicionar Comand"}</DialogTitle>
				<DialogContent>
					<Grid container spacing={2} mt={1}>
						<Grid xs={12}>
							<InputTextFieldControlled
								control={control}
								label="Nome do responsável"
								nameField="requesterName"
							/>
						</Grid>
						<Grid xs={12}>
							<InputTextFieldControlled
								control={control}
								label="CPF do responsável"
								nameField="requesterCPF"
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancelar</Button>
					{commandId ? (
						<Button
							onClick={() => dispatch(setModalSecondaryOpen(true))}
							variant="contained"
							color="error"
						>
							Remover
						</Button>
					) : null}
					<Button type="submit" disabled={Object.keys(errors).length !== 0} variant="contained">
						{commandId ? "Atualizar" : "Adicionar"}
					</Button>
				</DialogActions>
			</form>
			<DialogRemovalConfirmation
				open={openDeleteConfirmation.isOpen}
				handleClose={onCloseDeleteConfirmation}
				title={`Tem certeza que deseja remover a comanda de  ${getValues("requesterName")}?`}
				subtitle="ESSA AÇÃO É IRREVERSÍVEL!"
				onConfirmation={onConfirmationDelete}
			/>
		</Dialog>
	);
}
