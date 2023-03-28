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
	TableFooter,
} from "@mui/material";

import Page from "../../../components/common/Layout/Page";
import AddIcon from "@mui/icons-material/Add";
import ListEmpty from "../../../components/common/listEmpty";
import TextField from "@mui/material/TextField/TextField";
import AutocompleteControlled from "../../../components/Input/AutocompleteControlled";
import DialogItems from "./components/DialogItems";
import InputSelectControlled from "../../../components/Input/SelectControlled";

// redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCommandsRequest } from "../../../store/ducks/commands/slice";
import { getItemsRequest } from "../../../store/ducks/items/slice";
import {
	createOrderRequest,
	removeOrderRequest,
	updateOrderRequest,
} from "../../../store/ducks/orders/slice";

// validator
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// const
import { optionsOrderStatus } from "../../../helper/constants/orderStatus";
import DialogRemovalConfirmation from "../../../components/Dialog/RemovalConfirmation";
import { setModalSecondaryOpen } from "../../../store/ducks/layout/slice";

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
	status: yup.number().notRequired(),
});

export default function CreateUpdate() {
	const navigate = useNavigate();
	const { idOrder } = useParams();
	const dispatch = useAppDispatch();
	const [openItems, setOpenItems] = useState(false);
	const openDeleteConfirmation = useAppSelector((state) => state.layout.modals.secondary);
	const [removeOpen, setRemoveOpen] = useState(false);
	const {
		items: itemsState,
		commands: commandsState,
		orders: orderState,
	} = useAppSelector((state) => state);

	const orderFiltered = orderState.data.find((order) => order.id === Number(idOrder));

	const commandOptions = commandsState.data.map((el) => ({
		text: el.requesterName,
		id: el.id,
	}));

	useEffect(() => {
		dispatch(getCommandsRequest());
		dispatch(getItemsRequest());
	}, []);

	useEffect(() => {
		if (idOrder) {
			const items = orderFiltered?.orderItems.map((orderItem) => ({
				id: orderItem.item.id,
				quantity: orderItem.quantity,
			}));

			const statusId = optionsOrderStatus.find(
				(optStatus) => optStatus.key === orderFiltered?.status
			)?.id;

			!!orderFiltered && setValue("commandId", orderFiltered.command.id);
			!!statusId && setValue("status", statusId);
			!!items && setValue("items", items);
		}
	}, [commandsState]);

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
			commandId: undefined as number | undefined,
			items: [] as { id: number; quantity: number }[],
			...(idOrder ? { status: "" as string | number } : {}),
		},
	});

	const onSubmit = (data: typeof defaultValues) => {
		if (!idOrder) {
			dispatch(createOrderRequest(data));
			return;
		}

		const status = optionsOrderStatus.find((option) => option.id === data?.status)?.key;

		dispatch(updateOrderRequest({ ...data, status, id: idOrder }));
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
					{/* //FIXME: Não carrega valor no update */}
					<AutocompleteControlled
						control={control}
						label="Comanda"
						nameField="commandId"
						noOptionsText="Sem comandas cadastradas"
						loading={commandsState.loading}
						options={commandOptions}
					/>
				</Grid>
				<Grid xs={12} sm={6} md={4}>
					<Button
						variant="contained"
						startIcon={<AddIcon />}
						onClick={() => setOpenItems(true)}
						fullWidth
					>
						Adicionar item
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

							{getValues("items").length > 0 && (
								<TableBody>
									{getValues("items").map((item) => {
										const itemFiltered = itemsState.data.find(
											(itemData) => itemData.id === item.id
										);

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
							)}
							{getValues("items").length === 0 && (
								<TableFooter>
									<TableRow>
										<TableCell colSpan={4}>
											<ListEmpty
												dataList={getValues("items")}
												label="Itens"
												action={() => setOpenItems(true)}
											/>
										</TableCell>
									</TableRow>
								</TableFooter>
							)}
						</Table>
					</TableContainer>
				</Grid>
			</Page.Content>
			<Page.Content container justifyContent={"flex-end"} mt={1}>
				{!!idOrder && (
					<Grid xs={4}>
						<InputSelectControlled
							control={control}
							label="Status"
							nameField="status"
							options={optionsOrderStatus}
							emptyField
						/>
					</Grid>
				)}

				<Grid xs={4}>
					<TextField
						fullWidth
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
				<Grid xs={12} sm={6} md={4}>
					<Button fullWidth variant="outlined" onClick={() => navigate(routesApp.orders.list)}>
						Voltar
					</Button>
				</Grid>
				<Grid xs={12} sm={6} md={4}>
					<Button
						fullWidth
						variant="contained"
						onClick={() => dispatch(setModalSecondaryOpen(true))}
						color="error"
					>
						Remover
					</Button>
				</Grid>
				<Grid xs={12} sm={6} md={4}>
					<Button
						fullWidth
						variant="contained"
						onClick={handleSubmit(onSubmit)}
						disabled={!!Object.values(errors).length}
					>
						{idOrder ? "Atualizar Pedido" : "Finalizar pedido"}
					</Button>
				</Grid>
			</Page.Content>
			<DialogRemovalConfirmation
				open={openDeleteConfirmation.isOpen}
				title={`Você tem certeza que deseja remover o pedido ${idOrder}?`}
				handleClose={() => dispatch(setModalSecondaryOpen(false))}
				onConfirmation={() => dispatch(removeOrderRequest(idOrder))}
			/>
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
