import React, { useEffect, useState } from "react";
//MUI
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Unstable_Grid2 as Grid,
} from "@mui/material";

//COMPONENTS
import InputTextFieldControlled from "../../Input/TextFieldControlled";
import InputSwitchControlled from "../../Input/SwitchControlled";

// REDUX E SAGA
import {
	createItemRequest,
	removeItemRequest,
	updateItemRequest,
} from "../../../store/ducks/items/slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

//VALIDADOR
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import DialogRemovalConfirmation from "../RemovalConfirmation";
import AutocompleteControlled from "../../Input/AutocompleteControlled";

//IMAGE

const schema = yup.object().shape({
	name: yup.string().required("Preencha o nome"),
	description: yup.string().required("Preencha a descrição"),
	price: yup.number().required("Preencha o preço").typeError("Preencha um preço válido"),
	avaliable: yup.boolean().required("Preencha se o item está disponível"),
	categoryId: yup.number().required("Escolha uma categoria"),
});

interface DialogCreateOrEditItemProps {
	open: boolean;
	handleClose: () => void;
	idItem?: number | null;
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
			setValue("categoryId", itemFiltered.category.id);
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
		formState: { errors, defaultValues },
		// resetField,
		setValue,
		// trigger,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: "" as string,
			description: "" as string,
			price: "" as number | string,
			imagePath: "" as string,
			avaliable: true,
			categoryId: undefined as number | undefined,
		},
	});

	const handleItem = (data: typeof defaultValues) => {
		if (idItem && !dataChanged()) {
			toast.warning("Algum dado deve ser mudado para atualizar.");
			return;
		}

		if (!idItem) {
			dispatch(createItemRequest(data));
			onClose();
			return;
		}

		if (idItem && dataChanged()) {
			dispatch(updateItemRequest({ ...data, id: itemFiltered.id }));
			onClose();
			return;
		}
	};

	const dataChanged = () => {
		return (
			getValues().avaliable !== itemFiltered.avaliable ||
			getValues().categoryId !== itemFiltered.category.id ||
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
							<InputTextFieldControlled control={control} label="Nome do item" nameField="name" />
						</Grid>
						<Grid xs={12}>
							<InputTextFieldControlled
								control={control}
								label="Descrição do item"
								nameField="description"
							/>
						</Grid>
						<Grid xs={12}>
							<InputTextFieldControlled control={control} label="Preço do item" nameField="price" />
						</Grid>
						<Grid xs={12}>
							<AutocompleteControlled
								control={control}
								label="Categoria"
								nameField="categoryId"
								noOptionsText="Não existe categorias cadastradas"
								options={categoriesState.data.map(({ id, name }) => ({ id, text: name }))}
								loading={categoriesState.loading}
							/>

							{/* <Controller
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
										noOptionsText={"Não existe categorias cadastradas"}
										loadingText={"Carregando..."}
										loading={categoriesState.loading}
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
							/> */}
						</Grid>
						<Grid xs={12} sx={{ display: "flex", alignItems: "center" }}>
							<InputSwitchControlled
								control={control}
								label="Item disponível ?"
								nameField="avaliable"
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
