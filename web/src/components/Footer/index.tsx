// ROUTER
import { useNavigate } from "react-router-dom";
//MUI
import { Divider, Container, Unstable_Grid2 as Grid, Typography } from "@mui/material";
// STYLES
import { TypographyStyled } from "./styles";
import { routesApp } from "../../helper/constants/routes";

export default function Footer() {
	const navigate = useNavigate();
	return (
		<>
			<Divider sx={{ marginTop: "1rem" }} />
			<Container>
				<Grid container alignItems="center" justifyContent={"center"} sx={{ margin: "1rem 0" }}>
					<Grid sx={{ justifySelf: "flex-end" }}>
						<Typography sx={{ display: "inline-block", textAlign: "center", width: "100%" }}>
							<TypographyStyled onClick={() => navigate(routesApp.initial.main)}>
								Info
							</TypographyStyled>
							{" . "}
							<TypographyStyled onClick={() => navigate(routesApp.initial.main)}>
								Suporte
							</TypographyStyled>
							{" . "}
							<TypographyStyled onClick={() => navigate(routesApp.initial.main)}>
								Marketing
							</TypographyStyled>
							{" . "}
							<TypographyStyled onClick={() => navigate(routesApp.initial.main)}>
								Termos de uso
							</TypographyStyled>
							{" . "}
							<TypographyStyled onClick={() => navigate(routesApp.initial.main)}>
								Política de privacidade
							</TypographyStyled>
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
