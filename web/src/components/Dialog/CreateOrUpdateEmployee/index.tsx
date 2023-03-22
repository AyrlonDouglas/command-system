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
import InputSwitchControlled from "../../Input/SwitchControlled";
import { toast } from "react-toastify";

const schema = yup.object().shape({
	firstName: yup.string().required("Preencha o primeiro nome"),
	lastName: yup.string().required("Preencha o sobrenome"),
	email: yup.string().email("Preencha um e-mail válido").required("Preencha o e-mail"),
	roleId: yup
		.number()
		.required("Escolha uma função")
		.test("is-not-minus-one", "Escolha uma função", (value) => value !== -1),
	isActive: yup.boolean().required("Escolha o status"),
});

interface DialogCreateOrEditEmployeeProps {
	open: boolean;
	handleClose: () => void;
	EmployeeId?: number | null;
}

export default function DialogCreateOrUpdateEmployee({
	handleClose,
	open,
	EmployeeId,
}: DialogCreateOrEditEmployeeProps) {
	const dispatch = useAppDispatch();
	const employeesState = useAppSelector((state) => state.employees);
	const rolesState = useAppSelector((state) => state.roles);

	const employeeFiltered = employeesState.data.filter((employee) => employee.id === EmployeeId)[0];

	useEffect(() => {
		if (EmployeeId && open) {
			setValue("firstName", employeeFiltered.firstName);
			setValue("lastName", employeeFiltered.lastName);
			setValue("email", employeeFiltered.email);
			setValue("roleId", employeeFiltered?.role?.id);
			setValue("isActive", employeeFiltered.isActive);
		}

		return () => reset();
	}, [open]);
	const {
		handleSubmit,
		control,
		// getValues,
		// setError,
		formState: { errors, defaultValues },
		// resetField,
		setValue,
		// trigger,
		// watch,

		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			firstName: "" as string | undefined,
			lastName: "" as string | undefined,
			email: "" as string | undefined,
			roleId: -1,
			isActive: true,
		},
	});

	const handleEmployee = (data: typeof defaultValues) => {
		if (!EmployeeId) {
			dispatch(createEmployeeRequest(data));
			onClose();
			return;
		}

		if (EmployeeId && dataChanged(data)) {
			dispatch(updateEmployeeRequest({ ...data, id: EmployeeId }));
			onClose();
			return;
		}

		if (EmployeeId && !dataChanged(data)) {
			toast.warning("Algum dado deve ser mudado para atualizar.");
		}
	};

	const dataChanged = (data: typeof defaultValues) => {
		return (
			data?.firstName !== employeeFiltered.firstName ||
			data.lastName !== employeeFiltered.lastName ||
			data.email !== employeeFiltered.email ||
			data.isActive !== employeeFiltered.isActive ||
			data.roleId !== employeeFiltered?.role?.id
		);
	};

	const onClose = () => {
		handleClose();
		reset();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<form onSubmit={handleSubmit(handleEmployee)}>
				<DialogTitle>{EmployeeId ? "Editar profissional" : "Adicionar profissional"}</DialogTitle>
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
								label="Função"
								nameField="roleId"
								options={rolesState.data
									.filter((role) => role.name !== "bot")
									.map((el) => ({ text: el.name, id: el.id }))}
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
						{EmployeeId ? "Atualizar" : "Adicionar"}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
