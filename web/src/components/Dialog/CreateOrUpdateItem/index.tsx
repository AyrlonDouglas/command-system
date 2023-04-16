import React, { useEffect, useState, useRef, DetailedHTMLProps, InputHTMLAttributes } from "react";
//MUI
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Unstable_Grid2 as Grid,
	Box,
	Typography,
	FormHelperText,
	IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// ICONS
import UploadFileIcon from "@mui/icons-material/UploadFile";

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

//

const schema = yup.object().shape({
	name: yup.string().required("Preencha o nome"),
	description: yup.string().required("Preencha a descrição"),
	price: yup.number().required("Preencha o preço").typeError("Preencha um preço válido"),
	avaliable: yup.boolean().required("Preencha se o item está disponível"),
	categoryId: yup.number().required("Escolha uma categoria"),
	file: yup.mixed().notRequired(),
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
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [imageUrl, setImageUrl] = useState("");
	const imageRef = useRef<HTMLImageElement | null>(null);
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
		watch,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: "" as string,
			description: "" as string,
			price: "" as number | string,
			imagePath: "" as string,
			avaliable: true,
			categoryId: undefined as number | undefined,
			file: undefined as File | undefined,
		},
	});

	const handleItem = (data: typeof defaultValues) => {
		if (idItem && !dataChanged()) {
			toast.warning("Algum dado deve ser mudado para atualizar.");
			return;
		}

		let form: typeof defaultValues | FormData = data;

		if (data && data.file) {
			const formData = new FormData();

			for (const [key, value] of Object.entries(data)) {
				if (key === "file") {
					formData.append(key, data.file, data.file.name);
				} else {
					formData.append(key, value.toString());
				}
			}

			form = formData;
		}

		console.log("form", form);

		if (!idItem) {
			dispatch(createItemRequest(form));
			// onClose();
			return;
		}

		if (idItem && dataChanged()) {
			dispatch(updateItemRequest({ ...form, id: itemFiltered.id }));
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

	const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let file: File | undefined = undefined;

		event.preventDefault();

		if (event.target && event.target.files) {
			file = event?.target?.files[0];
		}

		setValue("file", file);

		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setImageUrl(imageUrl);

			if (imageRef.current) {
				imageRef.current.src = imageUrl;
			}
		}
	};

	const handleButtonClickToFile = () => {
		if (fileInputRef?.current) {
			fileInputRef.current.click();
		}
	};

	const removeFile = () => {
		setValue("file", defaultValues?.file);
		setImageUrl("");
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
						</Grid>
						<Grid xs={12} sx={{ display: "flex", alignItems: "center" }}>
							<InputSwitchControlled
								control={control}
								label="Item disponível ?"
								nameField="avaliable"
							/>
						</Grid>
						<Grid xs={12} container>
							<Grid>
								<Button
									onClick={handleButtonClickToFile}
									variant="outlined"
									endIcon={<UploadFileIcon />}
								>
									Imagem
								</Button>
							</Grid>

							{!!imageUrl && (
								<Grid container xs={12}>
									<Grid xs={6} sx={{ position: "relative" }}>
										<IconButton
											sx={{
												position: "absolute",
												top: 10,
												right: 10,
											}}
											onClick={() => removeFile()}
										>
											<CloseIcon color="error" />
										</IconButton>
										<Box
											component={"img"}
											sx={{ width: "100%" }}
											src={imageUrl}
											alt="Uploaded preview"
											ref={imageRef}
										/>
									</Grid>
								</Grid>
							)}
							<Grid>
								{!!getValues("file")?.name && <Typography>{getValues("file")?.name}</Typography>}
							</Grid>
							{!!errors["file"] && (
								<Grid xs={12}>
									<FormHelperText error={!!errors["file"]}>
										{errors["file"]?.message}
									</FormHelperText>
								</Grid>
							)}
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
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					hidden
					onChange={(e) => handleFileInputChange(e)}
				/>
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
