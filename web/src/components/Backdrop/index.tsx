import React, { useCallback } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAppSelector } from "../../store/hooks";

export default function BackdropLoading() {
	const appState = useAppSelector((state) => state) as any;

	const checkLoading = useCallback(() => {
		let loading = false;

		const statesKeys = Object.keys(appState);

		for (let i = 0; i < statesKeys.length; i++) {
			if (appState[`${statesKeys[i]}`]?.loading) {
				loading = true;
			}
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
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}
