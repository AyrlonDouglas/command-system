
// components
import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Dialog,
	Unstable_Grid2 as Grid,
} from "@mui/material";

//VALIDADOR
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// redux
import { useAppSelector } from "../../../../../store/hooks";
import AutocompleteControlled from "../../../../../components/Input/AutocompleteControlled";

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
	// const [itemSelected, setItemSelected] = useState<null | number>(null);
	const { items: itemsState } = useAppSelector((state) => state);

	const {
		handleSubmit,
		control,
		getValues,
		// formState: { errors, defaultValues },
		// resetField,
		// setValue,
		// trigger,
		// watch,
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

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<Grid component={"form"} onSubmit={handleSubmit(handleConfirm)}>
				<DialogTitle>Selecione um item</DialogTitle>
				<DialogContent>
					<Grid container sx={{ mt: 0.5 }}>
						<Grid xs={12}>
							<AutocompleteControlled
								control={control}
								label="Items"
								loading={itemsState.loading}
								nameField="itemId"
								options={itemsState.data.filter(item=>item.avaliable).map(({ id, name }) => ({ id, text: name }))}
								noOptionsText="Não existem itens cadastrados"
								selectedOptions={selectedOptions}
								size="small"
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
