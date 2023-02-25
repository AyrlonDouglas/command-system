import React, { useEffect } from "react";
//MUI
import {
	Button,
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

// Redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
	createCategoryRequest,
	updateCategoryRequest,
} from "../../../store/ducks/categories/slice";
// style
import { DialogStyled as Dialog } from "./styles";

//VALIDADOR
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputTextFieldControlled from "../../Input/TextFieldControlled";
import { toast } from "react-toastify";

const schema = yup.object().shape({
	name: yup.string().required("Preencha o nome"),
});

interface DialogCreateOrEditCategoryProps {
	open: boolean;
	handleClose: () => void;
	categoryId?: number | null;
}

interface CreateOrEditCategoryProps {
	name: string | undefined;
}

export default function DialogCreateOrEditCategory({
	handleClose,
	categoryId,
	open,
}: DialogCreateOrEditCategoryProps) {
	const dispatch = useAppDispatch();
	const categoriesState = useAppSelector((state) => state.categories);
	const categoryFiltered = categoriesState.data.filter((category) => category.id === categoryId)[0];

	useEffect(() => {
		if (categoryId && open) {
			setValue("name", categoryFiltered.name);
		}
		return () => resetField("name");
	}, [open]);

	const {
		handleSubmit,
		control,
		getValues,
		formState: { errors },
		resetField,
		setValue,
		// trigger,
		// watch,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: "" as string | undefined,
		},
	});

	const handleCategory = (data: CreateOrEditCategoryProps) => {
		if (!categoryId) {
			dispatch(createCategoryRequest(data));
			onClose();
			return;
		}

		if (categoryId && dataChanged()) {
			dispatch(updateCategoryRequest({ ...data, id: categoryId }));
			onClose();
			return;
		}

		if (categoryId && !dataChanged()) {
			toast.warning("Algum dado deve ser mudado para atualizar.");
		}
	};

	const dataChanged = () => {
		return getValues("name") !== categoryFiltered.name;
	};

	const onClose = () => {
		handleClose();
		reset();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<form onSubmit={handleSubmit(handleCategory)}>
				<DialogTitle>{categoryId ? "Editar Categoria" : "Adicionar Categoria"}</DialogTitle>
				<DialogContent>
					<Grid container spacing={2} mt={1}>
						<Grid xs={12}>
							<InputTextFieldControlled control={control} label={"Nome"} nameField={"name"} />
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancelar</Button>
					<Button type="submit" disabled={Object.keys(errors).length !== 0} variant="contained">
						{categoryId ? "Atualizar" : "Adicionar"}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
