import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DialogRemovalConfirmationProps {
	onConfirmation: () => void;
	open: boolean;
	handleClose: () => void;
	title: string;
	subtitle?: string;
}

export default function DialogRemovalConfirmation(props: DialogRemovalConfirmationProps) {
	const { handleClose, onConfirmation, open, title, subtitle } = props;
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			{subtitle ? (
				<DialogContent>
					<DialogContentText id="alert-dialog-description">{subtitle}</DialogContentText>
				</DialogContent>
			) : null}

			<DialogActions>
				<Button onClick={handleClose} variant="outlined">
					cancelar
				</Button>
				<Button onClick={onConfirmation} variant="contained" color="error">
					remover
				</Button>
			</DialogActions>
		</Dialog>
	);
}
