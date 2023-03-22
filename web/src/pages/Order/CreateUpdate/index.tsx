import React, { useEffect, useState } from "react";

// router
import { useNavigate, useParams } from "react-router-dom";

// components
import { Unstable_Grid2 as Grid, Button, Typography } from "@mui/material";
import Page from "../../../components/common/Layout/Page";
import InputSelectControlled from "../../../components/Input/SelectControlled";
import AddIcon from "@mui/icons-material/Add";
// redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCommandsRequest } from "../../../store/ducks/commands/slice";
import { getItemsRequest } from "../../../store/ducks/items/slice";

// validator
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DialogItems from "./components/DialogItems";

const schema = yup.object().shape({
	commandId: yup.number().required("Selecione uma comanda"),
	items: yup.array().of(
		yup.object().shape({
			id: yup.number().required("id do item necessário"),
			quantity: yup
				.number()
				.min(1, "Quantidade deve ser maior que 0")
				.required("Escolha a quantidade"),
		})
	),
});

export default function CreateUpdate() {
	const navigate = useNavigate();
	const { idOrder } = useParams();
	const dispatch = useAppDispatch();
	const [openItems, setOpenItems] = useState(false);
	const { items: itemsState, commands: commandsState } = useAppSelector((state) => state);

	useEffect(() => {
		dispatch(getCommandsRequest());
		dispatch(getItemsRequest());
	}, []);

	const addItem = (id: number) => {
		const items = getValues("items");
		const newItem = { id, quantity: 1 };
		setValue("items", [...items, newItem]);
	};
	const {
		handleSubmit,
		control,
		// formState: { errors, defaultValues },
		// resetField,
		setValue,
		getValues,
		// trigger,
		// reset,
		// watch,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			commandId: "" as string | number,
			items: [] as { id: number; quantity: number }[],
		},
	});

	return (
		<Page.Page>
			<Page.Title title={idOrder ? "Atualizar pedido" : "Criar pedido"} />

			<Page.Content container>
				<Grid xs={6}>
					<InputSelectControlled
						control={control}
						label="Comanda"
						nameField="commandId"
						options={commandsState.data.map((el) => ({
							text: `${el.id} - ${el.requesterName}`,
							id: el.id,
						}))}
					/>
				</Grid>
				<Grid>
					<Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenItems(true)}>
						Adicionar item ao pedido
					</Button>
				</Grid>
			</Page.Content>

			<Page.Content container>
				<Grid xs={12}>
					<Typography>Items adicionados</Typography>
				</Grid>

				{getValues("items").map((item) => {
					const itemFiltered = itemsState.data.find((itemData) => itemData.id === item.id);
					return <p key={item.id}>{itemFiltered?.name}</p>;
				})}
			</Page.Content>
			<DialogItems
				open={openItems}
				onClose={() => setOpenItems(false)}
				addItem={addItem}
				selectedOptions={getValues("items").map((item) => item.id)}
			/>
		</Page.Page>
	);
}
