import { useState } from "react";
//ROUTES
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
//MUI
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [colorMode, setColorMode] = useState<PaletteMode>(color as PaletteMode);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme(colorMode)}>
				<ToastContainer theme={colorMode} position="bottom-center" />
				<BrowserRouter>
					<NavigateSetter />
					<CssBaseline />
					<BackdropLoading />
					<Sidebar>
						<Routes />
					</Sidebar>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}
