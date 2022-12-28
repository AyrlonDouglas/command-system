import { useState } from "react";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { LOCAL } from "./helper/constants/localStorage";
import theme from "./theme";
import { Box, alpha } from "@mui/system";
import { red } from "@mui/material/colors";
export default function App() {
	const color = localStorage.getItem(LOCAL.colorMode) || "light";
	const [colorMode, setColorMode] = useState<PaletteMode>(color as PaletteMode);

	return (
		<ThemeProvider theme={theme(colorMode)}>
			<BrowserRouter>
				<CssBaseline />
				<Box sx={{ background: alpha(red[50], 0.5), minWidth: "100%", minHeight: "100vh" }}>
					<Routes />
				</Box>
			</BrowserRouter>
		</ThemeProvider>
	);
}
