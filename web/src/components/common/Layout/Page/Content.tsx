import { PropsWithChildren } from "react";
import { Unstable_Grid2 as Grid, Grid2Props } from "@mui/material";

export default function Content({ children, ...props }: PropsWithChildren<Grid2Props>) {
	return (
		<Grid xs={12} {...props}>
			{children}
		</Grid>
	);
}
