import React from "react";
//router
import { useNavigate } from "react-router-dom";
import { routesApp } from "../../helper/constants/routes";
//MUI
import { Button, Unstable_Grid2 as Grid, Divider, Typography } from "@mui/material";
//Components
import ListEmpty from "../../components/common/listEmpty";
import PageTitle from "../../components/common/PageTitle";

export default function Settings() {
	const navigate = useNavigate();
	return (
		<Grid container>
			<Grid xs={12}>
				<PageTitle title="Configuração de conta" />
			</Grid>

			<Grid xs={12}>
				<Button onClick={() => navigate(routesApp.settings.changePassword)}>Alterar senha</Button>
			</Grid>
		</Grid>
	);
}
