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
import Sidebar from "./components/Sidebar";
import BackdropLoading from "./components/Backdrop";
import NavigateSetter from "./routes/NavigateSetter";

export default function App() {
	const color = localStorage.getItem(LOCAL.colorMode) || "light";
	const [colorMode, setColorMode] = useState<PaletteMode>(color as PaletteMode);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme(colorMode)}>
				<ToastContainer theme={colorMode} />
				<BrowserRouter>
					<NavigateSetter />
					<CssBaseline />
					<BackdropLoading />
					<Sidebar>
						<Box
							sx={{
								minWidth: "100%",
								minHeight: "calc(100vh - 48px)",
							}}
						>
							<Routes />
						</Box>
					</Sidebar>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}
