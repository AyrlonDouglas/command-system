import React, { useEffect, useState } from "react";
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
	Switch,
	FormControlLabel,
} from "@mui/material";
// REDUX E SAGA
import {
	createItemRequest,
	removeItemRequest,
	updateItemRequest,
} from "../../../store/ducks/items/slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

//VALIDADOR
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import DialogRemovalConfirmation from "../RemovalConfirmation";

//IMAGE

const schema = yup.object().shape({
	name: yup.string().required("Preencha o nome"),
	description: yup.string().required("Preencha a descrição"),
	price: yup.number().required("Preencha o preço").typeError("Preencha um preço válido"),
	avaliable: yup.boolean().required("Preencha se o item está disponível"),
	category: yup
		.object()
		.shape({
			name: yup.string().required("Escolha uma categoria"),
			id: yup.number().moreThan(0, "Escolha uma categoria"),
		})
		.typeError("Escolha uma categoria")
		.required("Escolha uma catgoria"),
});

interface DialogCreateOrEditItemProps {
	open: boolean;
	handleClose: () => void;
	idItem?: number | null;
}

interface CreateOrEditItemProps {
	name: string | undefined;
	description: string | undefined;
	price: number | undefined;
	avaliable: boolean;
	category?: { name: string; id: number } | null;
}

export default function DialogCreateOrUpdateItem({
	handleClose,
	idItem,
	open,
}: DialogCreateOrEditItemProps) {
	const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
	const categoriesState = useAppSelector((state) => state.categories);
	const itemsState = useAppSelector((state) => state.items);

	const dispatch = useAppDispatch();

	const itemFiltered = itemsState.data.filter((item) => item.id === idItem)[0];

	useEffect(() => {
		if (idItem && open) {
			setValue("avaliable", itemFiltered.avaliable);
			setValue("category", itemFiltered.category);
			setValue("description", itemFiltered.description);
			setValue("name", itemFiltered.name);
			setValue("price", itemFiltered.price);
		}

		return () => reset();
	}, [open]);

	const {
		handleSubmit,
		control,
		getValues,
		formState: { errors },
		// resetField,
		setValue,
		// trigger,
		// watch,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: undefined as string | undefined,
			description: undefined as string | undefined,
			price: undefined as number | undefined,
			imagePath: undefined as string | undefined,
			avaliable: true,
			category: null as { id: number; name: string } | null,
		},
	});

	const handleItem = (data: CreateOrEditItemProps) => {
		if (idItem && !dataChanged()) {
			toast.warning("Algum dado deve ser mudado para atualizar.");
			return;
		}

		const categoryId = data.category?.id;

		delete data.category;

		if (!idItem) {
			dispatch(createItemRequest({ ...data, categoryId }));
			onClose();
			return;
		}

		if (idItem && dataChanged()) {
			dispatch(updateItemRequest({ ...data, categoryId, id: itemFiltered.id }));
			onClose();
			return;
		}
	};

	const dataChanged = () => {
		return (
			getValues().avaliable !== itemFiltered.avaliable ||
			getValues().category?.id !== itemFiltered.category.id ||
			getValues().description !== itemFiltered.description ||
			getValues().name !== itemFiltered.name ||
			getValues().price !== itemFiltered.price
		);
	};

	const onClose = () => {
		handleClose();
		reset();
	};
	const onCloseDeleteConfirmation = () => {
		setOpenDeleteConfirmation(false);
	};
	const onConfirmationDelete = () => {
		dispatch(removeItemRequest(idItem));
		setOpenDeleteConfirmation(false);
		onClose();
	};
	return (
		<Dialog open={open} onClose={onClose}>
			<form onSubmit={handleSubmit(handleItem)}>
				<DialogTitle>{idItem ? "Editar Item" : "Adicionar Item"}</DialogTitle>
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
								name="category"
								render={({ field: { onChange, value }, fieldState }) => (
									<Autocomplete
										onChange={(event, item) => {
											onChange(item);
										}}
										value={value}
										size="small"
										id="category"
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
						<Grid xs={12} sx={{ display: "flex", alignItems: "center" }}>
							<Controller
								name="avaliable"
								control={control}
								render={({ field: { onChange, value } }) => (
									<FormControlLabel
										control={
											<Switch
												name="avaliable"
												id="avaliable"
												onChange={(event, item) => {
													onChange(item);
												}}
												checked={value}
											/>
										}
										label="Item disponível ?"
									/>
								)}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancelar</Button>
					{idItem ? (
						<Button
							onClick={() => setOpenDeleteConfirmation(true)}
							variant="contained"
							color="error"
						>
							Remover
						</Button>
					) : null}
					<Button type="submit" disabled={Object.keys(errors).length !== 0} variant="contained">
						{idItem ? "Atualizar" : "Adicionar"}
					</Button>
				</DialogActions>
			</form>
			<DialogRemovalConfirmation
				open={openDeleteConfirmation}
				handleClose={onCloseDeleteConfirmation}
				title={`Tem certeza que deseja remover o item ${getValues("name")}?`}
				subtitle="ESSA AÇÃO É IRREVERSÍVEL!"
				onConfirmation={onConfirmationDelete}
			/>
		</Dialog>
	);
}
