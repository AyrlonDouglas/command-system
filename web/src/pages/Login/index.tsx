import React, { useState } from "react";
//MUI
import {
	Container,
	Unstable_Grid2 as Grid,
	Button,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
//ICONS
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//COMPONENTS
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
// STYLES
import { ImageFood } from "./styles";
// VALIDATOR
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// REDUX E SAGAS
import { loginRequest } from "../../store/ducks/login/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { LOCAL } from "../../helper/constants/localStorage";
import { useNavigate } from "react-router-dom";

interface ISignIn {
	password: string;
	employeeCode: string;
}

const schema = yup.object({
	employeeCode: yup.string().required("Preencha com seu código de usuário"),
	password: yup.string().required("Preencha a sua senha"),
});

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const loginState = useAppSelector((state) => state.login);
	const token = localStorage.getItem(LOCAL.token);
	const navigate = useNavigate();

	const handleShowPassword = () => {
		setShowPassword((state) => !state);
	};
	const dispatch = useAppDispatch();

	const {
		handleSubmit,
		control,
		// getValues,
		// formState: { errors },
		// resetField,
		// setValue,
		// trigger,
		// watch,
		// reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			employeeCode: "",
			password: "",
		},
	});

	const singIn = (data: ISignIn) => {
		const { employeeCode, password } = data;
		dispatch(loginRequest({ credentials: { employeeCode, password }, navigate }));
	};

	return (
		<>
			<NavBar />
			<Container sx={{ marginTop: "1rem", minHeight: "calc(100vh - 9rem)" }}>
				<Grid container spacing={2}>
					<Grid xs={12} sm={6} sx={{ display: { xs: "none", sm: "flex" } }}>
						<ImageFood src={"https://source.unsplash.com/random/?food&q=0"} />
					</Grid>
					<Grid xs={12} sm={6}>
						<Grid
							container
							sx={{ maxWidth: "20rem", margin: "0 auto" }}
							justifyContent={"center"}
							alignContent={"center"}
						>
							<form onSubmit={handleSubmit(singIn)}>
								<Grid container>
									<Grid>
										<Typography>Login</Typography>
									</Grid>
									<Grid xs={12} sx={{ margin: "0 auto" }}>
										<Controller
											name="employeeCode"
											control={control}
											render={({ field, fieldState }) => (
												<TextField
													{...field}
													id="employeeCode"
													label="Código do usuário"
													name="employeeCode"
													variant="standard"
													size="small"
													error={!!fieldState.error?.message}
													helperText={fieldState.error?.message}
													fullWidth
												/>
											)}
										/>
									</Grid>
									<Grid xs={12}>
										<Controller
											name="password"
											control={control}
											render={({ field, fieldState }) => (
												<TextField
													{...field}
													id="password"
													label="Senha"
													name="password"
													variant="standard"
													size="small"
													type={showPassword ? "text" : "password"}
													error={!!fieldState.error?.message}
													helperText={fieldState.error?.message}
													fullWidth
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	aria-label="toggle password visibility"
																	onClick={handleShowPassword}
																>
																	{showPassword ? <VisibilityOff /> : <Visibility />}
																</IconButton>
															</InputAdornment>
														),
													}}
												/>
											)}
										/>
									</Grid>
									<Grid>
										<Button type="submit" variant="contained">
											Entrar
										</Button>
									</Grid>
								</Grid>
							</form>
						</Grid>
					</Grid>
				</Grid>
			</Container>
			<Footer />
		</>
	);
}
