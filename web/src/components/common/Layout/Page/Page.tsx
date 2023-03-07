import React, { PropsWithChildren } from "react";
import { Unstable_Grid2 as Grid } from "@mui/material";

export default function Page({ children }: PropsWithChildren) {
	return (
		<Grid container spacing={2}>
			{children}
		</Grid>
	);
}
