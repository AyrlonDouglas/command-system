/* eslint-disable indent */
import { PaletteMode, useTheme } from "@mui/material";
import { createTheme, PaletteOptions, responsiveFontSizes } from "@mui/material/styles";

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
	const themeT = useTheme();

	if (mode === "dark") {
		colors = {
			background: {
				paper: "#02111b",
				default: "#000000f2",
			},
			primary: { main: "#0cce6b" },
			secondary: { main: "#9e1946" },
		};
	} else {
		colors = {
			background: { paper: "#F5F5F5", default: "#fff" },
			primary: { main: "#1f01b9" },
			terciary: { main: "#fcd581" },
			// secondary: { main: "#95c623" },
		};
	}

	let theme = createTheme({
		typography: {
			fontFamily: "Open Sans, sans-serif",
		},
		palette: {
			mode,
			...colors,
		},
		components: {},
	});

	theme = createTheme(theme, {
		components: {
			MuiTable: {
				styleOverrides: {
					root: ({ ownerState }) => ({
						...(ownerState.size === "small"
							? {
									"& th": { padding: "6px 16px" },
									"& .MuiTableCell-root": {
										padding: "6px 16px",
									},
							  }
							: {}),
					}),
				},
			},
			MuiTableHead: {
				styleOverrides: {
					root: () => ({
						"& th": { fontWeight: 700, color: theme.palette.common.white },
						backgroundColor: theme.palette.primary.main,
					}),
				},
			},
		},
	});

	return responsiveFontSizes(theme);
}
