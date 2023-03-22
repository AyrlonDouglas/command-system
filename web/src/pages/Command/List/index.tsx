import React, { useState, useEffect } from "react";
//mui
import {
	Button,
	Unstable_Grid2 as Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
//componentes
import InputSearch from "../../../components/Input/Search";
import ListEmpty from "../../../components/common/listEmpty";
import Page from "../../../components/common/Layout/Page";
import DialogCreateUpdateCommand from "../../../components/Dialog/CreateUpdateCommand";
// Redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCommandsRequest } from "../../../store/ducks/commands/slice";
import { setModalPrimaryOpen } from "../../../store/ducks/layout/slice";
import { getTablesRequest } from "../../../store/ducks/tables/slice";

export default function CommandList() {
	const dispatch = useAppDispatch();
	const commandState = useAppSelector((state) => state.commands);
	const [commandId, setCommandId] = useState<null | number>(null);
	const [search, setSearch] = useState("");
	const openCreateEdit = useAppSelector((state) => state.layout.modals.primary);

	useEffect(() => {
		dispatch(getCommandsRequest());
		dispatch(getTablesRequest());
	}, []);

	const handleSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleOpen = (type: "create" | "edit", id?: number) => {
		const commandId = type === "create" ? null : id || null;
		setCommandId(commandId);
		dispatch(setModalPrimaryOpen(true));
	};

	const handleClose = () => {
		dispatch(setModalPrimaryOpen(false));
	};

	const isMatchedBySearchTerm = (command: (typeof commandState.data)[0]) => {
		const searchTerm = search;

		return (
			command.requesterCPF.toString().includes(searchTerm.toLowerCase()) ||
			command.requesterName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			command?.table?.name?.toLowerCase().includes(searchTerm.toLowerCase())
		);
	};

	return (
		<Page.Page>
			<Page.Title title="Comandas" />

			<Page.Content container spacing={1} justifyContent={"space-between"}>
				<Grid xs={12} sm={5} md={4}>
					<InputSearch onChange={handleSearch} value={search} />
				</Grid>
				<Grid xs={12} sm={5} md={4}>
					<Button variant="contained" onClick={() => handleOpen("create")} fullWidth>
						Adicionar comanda
					</Button>
				</Grid>
			</Page.Content>

			<Page.Content>
				{commandState.data.length === 0 ? (
					<ListEmpty
						dataList={commandState.data}
						label="Comandas"
						action={() => handleOpen("create")}
					/>
				) : (
					<TableContainer component={Paper}>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell>Id</TableCell>
									<TableCell>CPF</TableCell>
									<TableCell align="left">Nome</TableCell>
									<TableCell align="left">Mesa</TableCell>
									<TableCell align="left">Custo total</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{commandState.data.filter(isMatchedBySearchTerm).map((command) => (
									<TableRow
										onClick={() => handleOpen("edit", command.id)}
										key={command.id}
										sx={{ cursor: "pointer" }}
										hover
									>
										<TableCell component="th" scope="row">
											{command.id}
										</TableCell>
										<TableCell component="th" scope="row">
											{command.requesterCPF}
										</TableCell>
										<TableCell align="left">{command.requesterName}</TableCell>
										<TableCell align="left">{command?.table?.name}</TableCell>
										<TableCell align="left">{`R$ ${command.totalCost?.toFixed(2)}`}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Page.Content>

			<DialogCreateUpdateCommand
				open={openCreateEdit.isOpen}
				commandId={commandId}
				handleClose={handleClose}
			/>
		</Page.Page>
	);
}
