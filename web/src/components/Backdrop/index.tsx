import React, { useCallback } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";

export default function BackdropLoading() {
	const appState = useAppSelector((state) => state) as RootState;

	const checkLoading = useCallback(() => {
		let loading = false;

		const states = Object.values(appState);

		if (states.some((state) => state.loading)) {
			loading = true;
		}

		return loading;
	}, [appState]);

	return (
		<Backdrop
			sx={{
				color: (theme) => theme.palette.primary.main,
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
			open={checkLoading()}
		>
			<CircularProgress color="primary" />
		</Backdrop>
	);
}
