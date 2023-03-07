import React from "react";
//router
import { useNavigate } from "react-router-dom";
import { routesApp } from "../../helper/constants/routes";
//MUI
import { Button, Unstable_Grid2 as Grid, Divider, Typography } from "@mui/material";
//Components
import ListEmpty from "../../components/common/listEmpty";
import PageTitle from "../../components/common/PageTitle";
import Page from "../../components/common/Layout/Page";

export default function Settings() {
	const navigate = useNavigate();
	return (
		<Page.Page>
			<Page.Title title="Configuração de conta" />
			<Page.Content>
				<Button onClick={() => navigate(routesApp.settings.changePassword)}>Alterar senha</Button>
			</Page.Content>
		</Page.Page>
	);
}
