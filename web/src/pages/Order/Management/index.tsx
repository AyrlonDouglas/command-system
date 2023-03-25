import React, { useEffect, useState } from "react";
//Router
import { useNavigate } from "react-router-dom";
// Components
import {
	Button,
	Unstable_Grid2 as Grid,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material";

import ListEmpty from "../../../components/common/listEmpty";
import Page from "../../../components/common/Layout/Page";
import InputSearch from "../../../components/Input/Search";
// redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getOrdersRequest } from "../../../store/ducks/orders/slice";

// const
import { routesApp } from "../../../helper/constants/routes";
import { optionsOrderStatus } from "../../../helper/constants/orderStatus";

export default function OrderManagement() {
	const [search, setSearch] = useState("");
	const dispatch = useAppDispatch();
	const ordersState = useAppSelector((state) => state.orders);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getOrdersRequest());
	}, []);

	const onChangeSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<Page.Page>
			<Page.Title title="Pedidos" />

			<Page.Content container>
				<Grid xs={12} sm={5} md={4}>
					<InputSearch placeholder="comida mexicana etc" value={search} onChange={onChangeSearch} />
				</Grid>
				<Grid xs={12} sm={5} md={4}>
					<Button variant="contained" onClick={() => navigate(routesApp.orders.create)} fullWidth>
						Adicionar Pedido
					</Button>
				</Grid>
			</Page.Content>

			<Page.Content container>
				{ordersState.data.length === 0 ? (
					<ListEmpty
						label="Pedidos"
						action={() => navigate(routesApp.orders.create)}
						dataList={ordersState.data}
					/>
				) : (
					<TableContainer component={Paper}>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell align="left">Id</TableCell>
									<TableCell align="left">Status</TableCell>
									<TableCell align="left">Comanda</TableCell>
									<TableCell align="left">Mesa</TableCell>
									<TableCell align="left">Valor</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{ordersState.data
									.filter((e) => e)
									.sort((a, b) => (a.id > b.id ? 1 : -1))
									.map((order) => (
										<TableRow
											onClick={() => navigate(routesApp.orders.update(order.id))}
											key={order.id}
											sx={{ cursor: "pointer" }}
											hover
										>
											<TableCell component="th" scope="row">
												{order.id}
											</TableCell>
											<TableCell component="th" scope="row">
												{optionsOrderStatus.find((opt) => opt.key === order.status)?.text}
											</TableCell>
											<TableCell component="th" scope="row">
												{order.command.id}
											</TableCell>
											<TableCell component="th" scope="row">
												{order?.command?.table?.name ?? "--"}
											</TableCell>
											<TableCell component="th" scope="row">
												{order?.orderItems
													.reduce((acc, current) => acc + current.quantity * current.item.price, 0)
													.toLocaleString("pt-br", {
														style: "currency",
														currency: "BRL",
													})}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Page.Content>
		</Page.Page>
	);
}
