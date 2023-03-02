import React, { useState, useEffect } from "react";
//mui
import { Button, Unstable_Grid2 as Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
//componentes
import PageTitle from "../../../components/common/PageTitle";
import InputSearch from "../../../components/Input/Search";
// Redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCommandsRequest } from "../../../store/ducks/commands/slice";
import DialogCreateUpdateCommand from "../../../components/Dialog/CreateUpdateCommand";
import { setModalPrimaryOpen } from "../../../store/ducks/layout/slice";

export default function CommandList() {
	const dispatch = useAppDispatch();
	const commandState = useAppSelector((state) => state.commands);
	const [commandId, setCommandId] = useState<null | number>(null);
	const [search, setSearch] = useState("");
	const openCreateEdit = useAppSelector((state) => state.layout.modals.primary);

	useEffect(() => {
		dispatch(getCommandsRequest());
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
		<Grid container spacing={1}>
			<Grid xs={12}>
				<PageTitle title="Comandas" />
			</Grid>

			<Grid xs={12} container spacing={1} justifyContent={"space-between"}>
				<Grid xs={12} sm={5} md={4}>
					<InputSearch onChange={handleSearch} value={search} />
				</Grid>
				<Grid xs={12} sm={5} md={4}>
					<Button variant="contained" onClick={() => handleOpen("create")} fullWidth>
						Adicionar comanda
					</Button>
				</Grid>
			</Grid>

			<TableContainer component={Paper} sx={{ mt: 2 }}>
				<Table>
					<TableHead sx={{ background: (t) => t.palette.primary.light }}>
						<TableRow
							sx={{
								"& th": {
									fontWeight: 700,
									padding: "8px 16px",
									color: (t) => t.palette.common.white,
								},
							}}
						>
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
								sx={{
									"&:last-child td, &:last-child th": { border: 0 },
									"&:hover": { background: (t) => t.palette.background.default, cursor: "pointer" },
									"& th": { padding: "0 16px" },
								}}
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
			<DialogCreateUpdateCommand
				open={openCreateEdit.isOpen}
				commandId={commandId}
				handleClose={handleClose}
			/>
		</Grid>
	);
}
