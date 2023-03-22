import React from "react";
//router
import { useNavigate } from "react-router-dom";
import { routesApp } from "../../../helper/constants/routes";
//MUI
import { Button, Unstable_Grid2 as Grid, Divider, Typography } from "@mui/material";
//Components
import ListEmpty from "../../../components/common/listEmpty";
import PageTitle from "../../../components/common/PageTitle";
import InputTextFieldControlled from "../../../components/Input/TextFieldControlled";
//VALIDADOR
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//redux
import { updateEmployeePassRequest } from "../../../store/ducks/employees/slice";
import { useAppDispatch } from "../../../store/hooks";

const schema = yup.object().shape({
	oldPass: yup.string().required("Preencha com sua atual senha"),
	newPass: yup.string().required("Preencha com a nova senha"),
	newPassConfirm: yup
		.string()
		.oneOf([yup.ref("newPass")], "Senhas não são iguais")
		.required("Preencha com a nova senha"),
});

export default function ChangePassword() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {
		handleSubmit,
		control,
		getValues,
		formState: { errors },
		resetField,
		setValue,
		// trigger,
		// watch,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			oldPass: "",
			newPass: "",
			newPassConfirm: "",
		},
	});

	const fields = getValues();

	const onSubmit = (data: typeof fields) => {
		dispatch(updateEmployeePassRequest(data));
	};

	return (
		<Grid container spacing={1}>
			<Grid xs={12}>
				<PageTitle title="Alterar de senha" />
			</Grid>

			<Grid
				xs={12}
				sm={8}
				md={4}
				container
				spacing={1}
				component="form"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Grid xs={12}>
					<InputTextFieldControlled control={control} label="Senha atual" nameField="oldPass" />
				</Grid>
				<Grid xs={12}>
					<InputTextFieldControlled control={control} label="Senha Nova" nameField="newPass" />
				</Grid>
				<Grid xs={12}>
					<InputTextFieldControlled
						control={control}
						label="Confirmar nova senha"
						nameField="newPassConfirm"
					/>
				</Grid>
				<Grid container justifyContent={"flex-end"} xs={12}>
					<Grid xs={12} sm={6}>
						<Button
							variant="outlined"
							onClick={() => navigate(routesApp.settings.account)}
							fullWidth
						>
							Voltar
						</Button>
					</Grid>
					<Grid xs={12} sm={6}>
						<Button variant="contained" type="submit" fullWidth>
							Confirmar
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
