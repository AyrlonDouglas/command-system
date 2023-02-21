import { useState, useEffect } from "react";

// components
import {
	Unstable_Grid2 as Grid,
	Button,
	TableContainer,
	Table,
	Paper,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material";
import PageTitle from "../../../components/common/PageTitle";
import InputSearch from "../../../components/Input/Search";
// redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getEmployeesRequest } from "../../../store/ducks/employees/slice";
import ListEmpty from "../../../components/common/listEmpty";
import CardEmployee from "../../../components/Card/Employee";
import DialogCreateOrUpdateEmployee from "../../../components/Dialog/CreateOrUpdateEmployee";
export default function EmployeesList() {
	const employeesState = useAppSelector((state) => state.employees);
	const [search, setSearch] = useState("");
	const [openCreateEmployee, setOpenCreateEmployee] = useState(false);
	const [openUpdateEmployee, setOpenUpdateEmployee] = useState(false);
	const [employeeId, setEmployeeId] = useState(-1);

	const dispatch = useAppDispatch();

	const handleCloseCreate = () => setOpenCreateEmployee(false);
	const handleOpenCreate = () => setOpenCreateEmployee(true);
	const handleCloseUpdate = () => setOpenUpdateEmployee(false);
	const handleOpenUpdate = () => setOpenUpdateEmployee(true);

	const handleSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleSearchItems = (employee: typeof employeesState.data[0]) => {
		if (!search) {
			return employee.type !== "bot";
		}

		return (
			employee.type !== "bot" &&
			(employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
				employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
				employee.type.toString().toLowerCase().includes(search.toLowerCase()) ||
				employee.employeeCode.toString().toLowerCase().includes(search.toLowerCase()))
		);
	};

	useEffect(() => {
		dispatch(getEmployeesRequest());
	}, []);

	return (
		<>
			<Grid container>
				<Grid xs={12}>
					<PageTitle title="Profissionais" />
				</Grid>

				<Grid xs={12} container spacing={1} justifyContent={"space-between"}>
					<Grid xs={12} sm={6}>
						<InputSearch onChange={handleSearch} value={search} />
					</Grid>
					<Grid xs={12} sm={6}>
						<Button variant="contained" onClick={handleOpenCreate} fullWidth>
							Adicionar profissional
						</Button>
					</Grid>
				</Grid>

				<Grid xs={12} container spacing={1} sx={{ marginTop: "1rem" }}>
					<ListEmpty
						dataList={employeesState.data}
						label="Profissionais"
						action={handleOpenCreate}
					/>
					{employeesState.data.filter(handleSearchItems).map((employee) => (
						<Grid xs={12} sm={6} md={4} key={employee.id}>
							<CardEmployee
								employee={employee}
								onClick={() => {
									handleOpenUpdate();
									setEmployeeId(employee.id);
								}}
							/>
						</Grid>
					))}
				</Grid>
			</Grid>
			<DialogCreateOrUpdateEmployee open={openCreateEmployee} handleClose={handleCloseCreate} />
			<DialogCreateOrUpdateEmployee
				open={openUpdateEmployee}
				handleClose={handleCloseUpdate}
				canEdit
				EmployeeId={employeeId}
			/>
		</>
	);
}
