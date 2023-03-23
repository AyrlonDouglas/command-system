import React, { useEffect, useState } from "react";

// router
import { useNavigate, useParams } from "react-router-dom";
import { routesApp } from "../../../helper/constants/routes";

// components
import {
	Unstable_Grid2 as Grid,
	Button,
	Typography,
	FormHelperText,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material";

import Page from "../../../components/common/Layout/Page";
import AddIcon from "@mui/icons-material/Add";
import ListEmpty from "../../../components/common/listEmpty";
import TextField from "@mui/material/TextField/TextField";
import AutocompleteControlled from "../../../components/Input/AutocompleteControlled";
import DialogItems from "./components/DialogItems";

// redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCommandsRequest } from "../../../store/ducks/commands/slice";
import { getItemsRequest } from "../../../store/ducks/items/slice";
import { createOrderRequest } from "../../../store/ducks/orders/slice";

// validator
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
	commandId: yup.number().required("Selecione uma comanda"),
	items: yup
		.array()
		.of(
			yup.object().shape({
				id: yup.number().required("id do item necessário"),
				quantity: yup
					.number()
					.min(1, "Quantidade deve ser maior que 0")
					.required("Escolha a quantidade"),
			})
		)
		.min(1, "Adicione algum item"),
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
		formState: { errors, defaultValues, isSubmitted },
		// resetField,
		setValue,
		getValues,
		trigger,
		// reset,
		watch,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			commandId: undefined as undefined | number,
			items: [] as { id: number; quantity: number }[],
		},
	});

	const onSubmit = (data: typeof defaultValues) => {
		dispatch(createOrderRequest(data));
	};

	const changeQuantity = (id: number, value: number) => {
		const items = getValues("items");

		const index = items.findIndex((data) => data.id === id);

		if (index === -1) return;

		items[index] = { id, quantity: value };

		setValue("items", items);
	};

	const amount = () => {
		const items = getValues("items");

		const amount = itemsState.data.reduce((acc, current) => {
			for (const item of items) {
				if (current.id === item.id) {
					return acc + current.price * item.quantity;
				}
			}

			return acc;
		}, 0);

		return amount;
	};

	const removeItem = (id: number) => {
		const items = getValues("items").filter((item) => item.id !== id);
		setValue("items", items);
	};

	return (
		<Page.Page>
			<Page.Title title={idOrder ? "Atualizar pedido" : "Criar pedido"} />

			<Page.Content container>
				<Grid xs={12} sm={6} md={8}>
					<AutocompleteControlled
						control={control}
						label="Comanda"
						nameField="commandId"
						noOptionsText="Sem comandas cadastradas"
						loading={commandsState.loading}
						options={commandsState.data.map((el) => ({
							text: el.requesterName,
							id: el.id,
						}))}
					/>
				</Grid>
				<Grid xs={12} sm={6} md={4}>
					<Button
						variant="contained"
						startIcon={<AddIcon />}
						onClick={() => setOpenItems(true)}
						fullWidth
					>
						Adicionar item ao pedido
					</Button>
					{!!errors.items && (
						<FormHelperText error={!!errors.items}>{errors.items?.message}</FormHelperText>
					)}
				</Grid>
			</Page.Content>

			<Page.Content container>
				<Grid xs={12}>
					<Typography>Items adicionados</Typography>
				</Grid>

				<Grid xs={12}>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell align="left">Id</TableCell>
									<TableCell align="left">Nome</TableCell>
									<TableCell align="left">Disponibilidade</TableCell>
									<TableCell align="left">Preço</TableCell>
									<TableCell align="left">Quantidade</TableCell>
									<TableCell align="left">Sub-total</TableCell>
									<TableCell align="left"></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<ListEmpty
									dataList={getValues("items")}
									label="Itens"
									action={() => setOpenItems(true)}
								/>
								{getValues("items").map((item) => {
									const itemFiltered = itemsState.data.find((itemData) => itemData.id === item.id);

									if (!itemFiltered) return null;

									return (
										<TableRow key={itemFiltered.id} hover>
											<TableCell component="th" scope="row">
												{itemFiltered.id}
											</TableCell>
											<TableCell component="th" scope="row">
												{itemFiltered.name}
											</TableCell>
											<TableCell component="th" scope="row">
												{itemFiltered.avaliable ? "Disponível" : "Indisponível"}
											</TableCell>
											<TableCell component="th" scope="row">
												{itemFiltered.price.toLocaleString("pt-br", {
													style: "currency",
													currency: "BRL",
												})}
											</TableCell>
											<TableCell component="th" scope="row">
												<TextField
													size="small"
													type={"number"}
													InputProps={{ inputProps: { min: 1 } }}
													value={
														watch("items").find((itemData) => itemData.id === item.id)?.quantity
													}
													onChange={(e) => changeQuantity(item.id, Number(e.target.value))}
												/>
											</TableCell>
											<TableCell component="th" scope="row">
												{(itemFiltered.price * item.quantity).toLocaleString("pt-br", {
													style: "currency",
													currency: "BRL",
												})}
											</TableCell>
											<TableCell component="th" scope="row">
												<Button
													variant="outlined"
													color="warning"
													onClick={() => removeItem(item.id)}
												>
													Remover
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Page.Content>
			<Page.Content container justifyContent={"flex-end"} mt={1}>
				<Grid>
					<TextField
						size={"small"}
						label="Valor Total"
						value={amount().toLocaleString("pt-br", {
							style: "currency",
							currency: "BRL",
						})}
						variant="outlined"
					/>
				</Grid>
			</Page.Content>
			<Page.Content container justifyContent={"flex-end"}>
				<Grid>
					<Button variant="outlined" onClick={() => navigate(routesApp.orders.list)}>
						Cancelar
					</Button>
				</Grid>
				<Grid>
					<Button
						variant="contained"
						onClick={handleSubmit(onSubmit)}
						disabled={!!Object.values(errors).length}
					>
						Finalizar pedido
					</Button>
				</Grid>
			</Page.Content>
			<DialogItems
				open={openItems}
				onClose={() => {
					setOpenItems(false);
					isSubmitted && trigger();
				}}
				addItem={addItem}
				selectedOptions={getValues("items").map((item) => item.id)}
			/>
		</Page.Page>
	);
}
