import React, { useEffect, useState } from "react";

// mui
import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Unstable_Grid2 as Grid,
} from "@mui/material";
// components
import Page from "../../../components/common/Layout/Page";
import InputSearch from "../../../components/Input/Search";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getTablesRequest } from "../../../store/ducks/tables/slice";
import ListEmpty from "../../../components/common/listEmpty";
import DialogCreateUpdateTable from "../../../components/Dialog/CreateUpdateTable";
import { setModalPrimaryOpen } from "../../../store/ducks/layout/slice";

export default function TableList() {
	const dispatch = useAppDispatch();
	const [search, setSearch] = useState("");
	const [tableId, setTableId] = useState<null | number>(null);

	const tableState = useAppSelector((state) => state.tables);
	const primaryModal = useAppSelector((state) => state.layout.modals.primary);

	useEffect(() => {
		dispatch(getTablesRequest());
	}, []);

	const handleOpen = (type: "create" | "edit", id?: number) => {
		const tableId = type === "create" ? null : id || null;
		setTableId(tableId);
		dispatch(setModalPrimaryOpen(true));
	};

	const handleSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleClose = () => {
		dispatch(setModalPrimaryOpen(false));
	};

	return (
		<Page.Page>
			<Page.Title title="Mesas" />

			<Page.Content container spacing={1} justifyContent={"space-between"}>
				<Grid xs={12} sm={5} md={4}>
					<InputSearch onChange={handleSearch} value={search} />
				</Grid>
				<Grid xs={12} sm={5} md={4}>
					<Button variant="contained" onClick={() => handleOpen("create")} fullWidth>
						Adicionar Mesa
					</Button>
				</Grid>
			</Page.Content>

			<Page.Content>
				{tableState.data.length === 0 ? (
					<ListEmpty label="Mesas" action={() => handleOpen("create")} dataList={tableState.data} />
				) : (
					<TableContainer component={Paper}>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell align="left">Id</TableCell>
									<TableCell align="left">Nome</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{tableState.data
									.filter((e) => e)
									.map((table) => (
										<TableRow
											onClick={() => handleOpen("edit", table.id)}
											key={table.id}
											sx={{ cursor: "pointer" }}
											hover
										>
											<TableCell component="th" scope="row">
												{table.id}
											</TableCell>
											<TableCell component="th" scope="row">
												{table.name}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Page.Content>

			<DialogCreateUpdateTable
				open={primaryModal.isOpen}
				tableId={tableId}
				handleClose={handleClose}
			/>
		</Page.Page>
	);
}
