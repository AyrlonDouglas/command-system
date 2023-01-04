import React, { useEffect } from "react";
//MUI
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Unstable_Grid2 as Grid,
	Autocomplete,
	CircularProgress,
} from "@mui/material";
// REDUX E SAGA
import { getCategoriesRequest } from "../../../store/ducks/categories/slice";
import { createItemRequest } from "../../../store/ducks/items/slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

//VALIDADOR
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
	name: yup.string().required("Preencha o nome"),
	description: yup.string().required("Preencha a descrição"),
	price: yup.number().required("Preencha o preço").typeError("Preencha um preço válido"),
	// categoryId: yup.number().required("Selecione uma categoria"),
	categoryId: yup.number().typeError("Selecione uma categoria").required("Selecione uma categoria"),
});

interface DialogCreateItemProps {
	open: boolean;
	handleClose: () => void;
}

interface ICreateItem {
	name: string | undefined;
	description: string | undefined;
	price: number | undefined;
	categoryId: number | undefined;
}

export default function DialogCreateItem(props: DialogCreateItemProps) {
	const categoriesState = useAppSelector((state) => state.categories);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (props.open) {
			dispatch(getCategoriesRequest());
		}
	}, [props.open]);
	console.log(categoriesState);
	const {
		handleSubmit,
		control,
		getValues,
		formState: { errors },
		resetField,
		// setValue,
		// trigger,
		// watch,
		// reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: undefined,
			description: undefined,
			price: undefined,
			categoryId: undefined,
			imagePath: undefined,
		},
	});

	const createItem = (data: ICreateItem) => {
		console.log(data);
		dispatch(createItemRequest(data));
	};
	const onClose = () => {
		props.handleClose();

		resetField("name");
		resetField("description");
		resetField("price");
		resetField("categoryId");
	};
	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<form onSubmit={handleSubmit(createItem)}>
				<DialogTitle>Adicionar Item</DialogTitle>
				<DialogContent>
					<Grid container spacing={2} mt={1}>
						<Grid xs={12}>
							<Controller
								name="name"
								control={control}
								render={({ field, fieldState }) => (
									<TextField
										{...field}
										id="name"
										label="Nome do item"
										name="name"
										variant="outlined"
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
								name="description"
								control={control}
								render={({ field, fieldState }) => (
									<TextField
										{...field}
										id="description"
										label="Descrição do item"
										name="description"
										variant="outlined"
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
								name="price"
								control={control}
								render={({ field, fieldState }) => (
									<TextField
										{...field}
										id="price"
										label="Preço do item"
										name="price"
										variant="outlined"
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
								control={control}
								name="categoryId"
								render={({ field: { onChange, value }, fieldState }) => (
									<Autocomplete
										onChange={(event, item) => {
											onChange(item?.id);
										}}
										value={value}
										size="small"
										id="categoryId"
										options={categoriesState.data}
										getOptionLabel={(option) => option.name}
										noOptionsText="Não existe opções"
										loadingText={"Carregando..."}
										isOptionEqualToValue={(option, value) => {
											return option.id === value.id;
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Categoria"
												error={!!fieldState.error?.message}
												helperText={fieldState.error?.message}
												InputProps={{
													...params.InputProps,
													endAdornment: (
														<>
															{categoriesState.loading ? (
																<CircularProgress color="inherit" size={20} />
															) : null}
															{params.InputProps.endAdornment}
														</>
													),
												}}
											/>
										)}
									/>
								)}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancela</Button>
					<Button type="submit" disabled={Object.keys(errors).length !== 0}>
						Adicionar
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
