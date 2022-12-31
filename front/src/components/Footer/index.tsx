// ROUTER
import { useNavigate } from "react-router-dom";
//MUI
import { Divider, Container, Unstable_Grid2 as Grid, Typography } from "@mui/material";
// STYLES
import { TypographyStyled } from "./styles";

export default function Footer() {
	const navigate = useNavigate();
	return (
		<>
			<Divider sx={{ marginTop: "1rem" }} />
			<Container>
				<Grid container alignItems="center" justifyContent={"center"} sx={{ margin: "1rem 0" }}>
					<Grid sx={{ justifySelf: "flex-end" }}>
						<Typography sx={{ display: "inline-block", textAlign: "center", width: "100%" }}>
							<TypographyStyled onClick={() => navigate("/")}>Info</TypographyStyled>
							{" . "}
							<TypographyStyled onClick={() => navigate("/")}>Suporte</TypographyStyled>
							{" . "}
							<TypographyStyled onClick={() => navigate("/")}>Marketing</TypographyStyled>
							{" . "}
							<TypographyStyled onClick={() => navigate("/")}>Termos de uso</TypographyStyled>
							{" . "}
							<TypographyStyled onClick={() => navigate("/")}>
								Política de privacidade
							</TypographyStyled>
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
