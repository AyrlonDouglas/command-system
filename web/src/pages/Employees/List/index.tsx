import { useState, useEffect } from "react";

// components
import { Unstable_Grid2 as Grid, Button } from "@mui/material";
import PageTitle from "../../../components/common/PageTitle";
import InputSearch from "../../../components/Input/Search";
// redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getEmployeesRequest } from "../../../store/ducks/employees/slice";
import ListEmpty from "../../../components/common/listEmpty";
import CardEmployee from "../../../components/Card/Employee";
import DialogCreateOrUpdateEmployee from "../../../components/Dialog/CreateOrUpdateEmployee";
import { getRolesRequest } from "../../../store/ducks/roles/slice";
import Page from "../../../components/common/Layout/Page";
export default function EmployeesList() {
	const employeesState = useAppSelector((state) => state.employees);
	const [search, setSearch] = useState("");
	const [openCreateEditEmployee, setOpenCreateEditEmployee] = useState(false);
	const [employeeId, setEmployeeId] = useState<null | number>(null);

	const dispatch = useAppDispatch();

	const handleCloseCreateEdit = () => {
		setEmployeeId(null);
		setOpenCreateEditEmployee(false);
	};
	const handleOpenCreateEdit = () => setOpenCreateEditEmployee(true);

	const handleSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const isBotEmployee = (employee: (typeof employeesState.data)[0]) => {
		return employee?.role?.name !== "bot";
	};

	const isMatchedBySearchTerm = (employee: (typeof employeesState.data)[0], searchTerm: string) => {
		return (
			employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.role?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.employeeCode.toString().toLowerCase().includes(searchTerm.toLowerCase())
		);
	};

	const handleSearchItems = (employee: (typeof employeesState.data)[0]) => {
		if (!search) {
			return isBotEmployee(employee);
		}

		return isBotEmployee(employee) && isMatchedBySearchTerm(employee, search);
	};

	useEffect(() => {
		dispatch(getEmployeesRequest());
		dispatch(getRolesRequest());
	}, []);

	return (
		<>
			<Page.Page>
				<Page.Title title="Profissionais" />

				<Page.Content container spacing={1} justifyContent={"space-between"}>
					<Grid xs={12} sm={6}>
						<InputSearch onChange={handleSearch} value={search} />
					</Grid>
					<Grid xs={12} sm={6}>
						<Button variant="contained" onClick={handleOpenCreateEdit} fullWidth>
							Adicionar profissional
						</Button>
					</Grid>
				</Page.Content>

				<Page.Content container spacing={1}>
					<ListEmpty
						dataList={employeesState.data}
						label="Profissionais"
						action={handleOpenCreateEdit}
					/>
					{employeesState.data.filter(handleSearchItems).map((employee) => (
						<Grid xs={12} sm={6} md={4} key={employee.id}>
							<CardEmployee
								employee={employee}
								onClick={() => {
									setEmployeeId(employee.id);
									handleOpenCreateEdit();
								}}
							/>
						</Grid>
					))}
				</Page.Content>
			</Page.Page>
			<DialogCreateOrUpdateEmployee
				open={openCreateEditEmployee}
				handleClose={handleCloseCreateEdit}
				EmployeeId={employeeId}
			/>
		</>
	);
}
