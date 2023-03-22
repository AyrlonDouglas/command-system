import React, { useState, useEffect } from "react";

// components
import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Dialog,
	Unstable_Grid2 as Grid,
	Autocomplete,
	CircularProgress,
	TextField,
} from "@mui/material";

//VALIDADOR
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// redux
import { useAppSelector } from "../../../../../store/hooks";

const schema = yup.object().shape({
	itemId: yup.number().required("Selecione um item"),
});

interface DialogItemsProps {
	open: boolean;
	onClose: () => void;
	addItem: (e: number) => void;
	selectedOptions: number[];
}

export default function DialogItems(props: DialogItemsProps) {
	const { addItem, onClose, open, selectedOptions } = props;
	const [itemSelected, setItemSelected] = useState<null | number>(null);
	const { items: itemsState } = useAppSelector((state) => state);

	const {
		handleSubmit,
		control,
		getValues,
		formState: { errors, defaultValues },
		// resetField,
		setValue,
		// trigger,
		watch,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			itemId: undefined as undefined | number,
		},
	});

	const handleClose = () => {
		onClose();
		reset();
	};

	const handleConfirm = () => {
		const itemId = Number(getValues("itemId"));
		addItem(itemId);
		handleClose();
	};
	console.log("watch", watch());
	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<Grid component={"form"} onSubmit={handleSubmit(handleConfirm)}>
				<DialogTitle>Selecione o item</DialogTitle>
				<DialogContent>
					<Grid container sx={{ mt: 0.5 }}>
						<Grid xs={12}>
							<Controller
								control={control}
								name="itemId"
								render={({ field: { onChange, value }, fieldState }) => (
									<Autocomplete
										onChange={(event, item) => {
											onChange(item?.id);
										}}
										value={itemsState.data.find((item) => item.id === value)}
										size="small"
										id="category"
										options={itemsState.data}
										getOptionDisabled={(option) => selectedOptions.includes(option.id)}
										getOptionLabel={(option) => `${option.id} - ${option.name}`}
										noOptionsText={"Não existe itens cadastradas"}
										loadingText={"Carregando..."}
										loading={itemsState.loading}
										isOptionEqualToValue={(option, value) => {
											return option.id === value.id;
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												label="itens"
												error={!!fieldState.error?.message}
												helperText={fieldState.error?.message}
												InputProps={{
													...params.InputProps,
													endAdornment: (
														<>
															{itemsState.loading ? (
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
					<Button onClick={handleClose} variant="outlined">
						Cancelar
					</Button>
					<Button type="submit" variant="contained">
						Adicionar
					</Button>
				</DialogActions>
			</Grid>
		</Dialog>
	);
}
