import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export default function theme(mode?: PaletteMode | undefined) {
	let colors;

	if (mode === "dark") {
		colors = {
			background: {
				paper: "#1C1C1C",
				default: "#151515",
			},
			primary: { main: "#00C496" },
			secondary: { main: "#008dd5" },
		};
	} else {
		colors = {};
	}

	return createTheme({
		// typography: {
		// 	fontFamily: "Inter, sans-serif",
		// },
		palette: {
			mode,
			...colors,
		},
		// components: {
		// 	MuiButton: {
		// 		styleOverrides: {
		// 			root: {
		// 				fontWeight: 700,
		// 			},
		// 		},
		// 	},
		// },
	});
}
