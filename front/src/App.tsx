import { useState } from "react";
//ROUTES
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
//MUI
import { CssBaseline, PaletteMode, ThemeProvider, Box } from "@mui/material";
import theme from "./theme";
//HELPER
import "react-toastify/dist/ReactToastify.css";
import { LOCAL } from "./helper/constants/localStorage";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";

export default function App() {
	const color = localStorage.getItem(LOCAL.colorMode) || "light";
	const [colorMode, setColorMode] = useState<PaletteMode>(color as PaletteMode);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme(colorMode)}>
				<ToastContainer theme={colorMode} />
				<BrowserRouter>
					<CssBaseline />
					<Box
						sx={{
							background: theme(colorMode).palette.background.default,
							minWidth: "100%",
							minHeight: "100vh",
						}}
					>
						<Routes />
					</Box>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}
