import { PaletteMode } from "@mui/material";
import { createTheme, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Palette {
		terciary?: Palette["primary"];
	}

	interface PaletteOptions {
		terciary?: PaletteOptions["primary"];
	}
}

export default function theme(mode?: PaletteMode | undefined) {
	let colors: PaletteOptions;

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
		colors = {
			background: { paper: "#f7f7f7", default: "#fff" },
			// primary: { main: "#C23E14" },
			primary: { main: "#de1a1a" },
			terciary: { main: "#fcd581" },
			// secondary: { main: "#95c623" },
		};
	}

	return createTheme({
		typography: {
			fontFamily: "Open Sans, sans-serif",
		},
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
