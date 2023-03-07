import React, { PropsWithChildren } from "react";
import { Unstable_Grid2 as Grid, Typography } from "@mui/material";

interface LayoutTitleProps {
	title: string;
}

export default function LayoutTitle({ title }: LayoutTitleProps) {
	return (
		<Grid xs={12}>
			<Typography variant="h5" fontWeight={"bold"}>
				{title}
			</Typography>
		</Grid>
	);
}
