import React from "react";
//router
import { useNavigate } from "react-router-dom";
import { routesApp } from "../../helper/constants/routes";
//MUI
import { Button } from "@mui/material";
//Components
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
