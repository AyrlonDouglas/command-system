// routes
import { useNavigate } from "react-router-dom";
// components
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	Box,
	DialogActions,
	Button,
} from "@mui/material";
//storage
import { LOCAL } from "../../../helper/constants/localStorage";

interface DialogLogoutProps {
	open: boolean;
	onClose: () => void;
}

export default function DialogLogout({ onClose, open }: DialogLogoutProps) {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem(LOCAL.token);
		onClose();
		navigate("/");
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle variant="h5" color="primary.main" fontWeight={"bold"} align="left">
				Já vai ?
			</DialogTitle>
			<DialogContent>
				<Typography align="center">
					Tem certeza de deseja sair do{" "}
					<Box component="span" fontWeight={"bold "}>
						COMAND
						<Box
							component="span"
							sx={{
								color: (theme) => theme.palette.primary.main,
								fontWeight: "900",
							}}
						>
							SYSTEM
						</Box>
					</Box>
					?
				</Typography>
				<Typography align="justify" mt={2}></Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleLogout} variant="outlined" fullWidth>
					Quero sair
				</Button>
				<Button onClick={onClose} variant="contained" fullWidth>
					Voltar
				</Button>
			</DialogActions>
		</Dialog>
	);
}
