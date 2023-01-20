import { styled, Dialog, DialogProps } from "@mui/material";

export const DialogStyled = styled(Dialog)<DialogProps>(({ theme }) => ({
	".MuiPaper-root": {
		width: theme.breakpoints.values.lg,
	},
}));
