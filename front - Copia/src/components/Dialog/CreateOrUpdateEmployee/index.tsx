import React, { useEffect } from "react";
//MUI
import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Unstable_Grid2 as Grid,
} from "@mui/material";

// Redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { createEmployeeRequest, updateEmployeeRequest } from "../../../store/ducks/employees/slice";
// style
import { DialogStyled as Dialog } from "./styles";

//VALIDADOR
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputTextFieldControlled from "../../Input/TextFieldControlled";
import InputSelectControlled from "../../Input/SelectControlled";
import { EEmployeeTypes } from "../../../helper/constants/employee";
import InputSwitchControlled from "../../Input/SwitchControlled";
import { toast } from "react-toastify";

const schema = yup.object().shape({
	firstName: yup.string().required("Preencha o primeiro nome"),
	lastName: yup.string().required("Preencha o sobrenome"),
	email: yup.string().email("Preencha um email válido").notRequired().nullable(),
	type: yup.string().required("Escolha o tipo"),
	isActive: yup.boolean().required("Escolha o status"),
});

interface DialogCreateOrEditEmployeeProps {
	open: boolean;
	handleClose: () => void;
	canEdit?: boolean;
	EmployeeId?: number;
}

interface CreateOrEditEmployeeProps {
	firstName: string | undefined;
	lastName: string | undefined;
	email: string | undefined;
	type: string | undefined;
	isActive: boolean | undefined;
}

export default function DialogCreateOrUpdateEmployee({
	handleClose,
	open,
	EmployeeId,
	canEdit,
}: DialogCreateOrEditEmployeeProps) {
	const dispatch = useAppDispatch();
	const employeesState = useAppSelector((state) => state.employees);
	const employeeFiltered = employeesState.data.filter((employee) => employee.id === EmployeeId)[0];
	useEffect(() => {
		if (canEdit && open) {
			setValue("firstName", employeeFiltered.firstName);
			setValue("lastName", employeeFiltered.lastName);
			setValue("email", employeeFiltered.email);
			setValue("type", employeeFiltered.type);
			setValue("isActive", employeeFiltered.isActive);
		}
	}, [open]);

	const {
		handleSubmit,
		control,
		getValues,
		// setError,
		formState: { errors },
		// resetField,
		setValue,
		// trigger,
		// watch,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			firstName: undefined as string | undefined,
			lastName: undefined as string | undefined,
			email: undefined as string | undefined,
			type: undefined as string | undefined,
			isActive: true,
		},
	});

	const handleEmployee = (data: CreateOrEditEmployeeProps) => {
		if (!canEdit) {
			dispatch(createEmployeeRequest(data));
			onClose();
			return;
		}

		if (canEdit && dataChanged()) {
			dispatch(updateEmployeeRequest({ ...data, id: EmployeeId }));
			onClose();
			return;
		}

		if (canEdit && !dataChanged()) {
			toast.warning("Algum dado deve ser mudado para atualizar.");
			return;
		}
	};

	const onClose = () => {
		handleClose();
		reset();
	};

	const dataChanged = () => {
		return (
			getValues().firstName !== employeeFiltered.firstName ||
			getValues().lastName !== employeeFiltered.lastName ||
			getValues().email !== employeeFiltered.email ||
			getValues().isActive !== employeeFiltered.isActive ||
			getValues().type !== employeeFiltered.type
		);
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<form onSubmit={handleSubmit(handleEmployee)}>
				<DialogTitle>{canEdit ? "Editar profissional" : "Adicionar profissional"}</DialogTitle>
				<DialogContent>
					<Grid container spacing={2} mt={1}>
						<Grid xs={12}>
							<InputTextFieldControlled control={control} nameField={"firstName"} label="Nome" />
						</Grid>
						<Grid xs={12}>
							<InputTextFieldControlled
								control={control}
								nameField={"lastName"}
								label="Sobrenome"
							/>
						</Grid>
						<Grid xs={12}>
							<InputTextFieldControlled control={control} nameField={"email"} label="E-mail" />
						</Grid>
						<Grid xs={6}>
							<InputSelectControlled
								control={control}
								label="Tipo"
								nameField="type"
								options={Object.values(EEmployeeTypes).filter((type) => type !== "bot")}
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								//@ts-ignore
								error={errors}
							/>
						</Grid>
						<Grid xs={6}>
							<InputSwitchControlled
								control={control}
								nameField={"isActive"}
								label={"Profissional ativo?"}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancelar</Button>
					<Button type="submit" disabled={Object.keys(errors).length !== 0} variant="contained">
						{canEdit ? "Atualizar" : "Adicionar"}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
