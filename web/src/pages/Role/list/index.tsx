import React, { useEffect, useState } from "react";
//router
import { useNavigate } from "react-router-dom";
// MUI
import {
	Unstable_Grid2 as Grid,
	Button,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
//Components
import PageTitle from "../../../components/common/PageTitle";
import ListEmpty from "../../../components/common/listEmpty";
import InputSearch from "../../../components/Input/Search";
//Redux
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getRolesRequest } from "../../../store/ducks/roles/slice";

export default function RoleList() {
	const { roles: rolesState } = useAppSelector((state) => state);
	const [search, setSearch] = useState("");
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getRolesRequest());
	}, []);

	const handleSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const isMatchedSearch = (role: (typeof rolesState.data)[0]) => {
		if (!search) {
			return true;
		}

		return role.name.toLowerCase().includes(search.toLowerCase());
	};

	const toCreateRole = () => navigate("/roles/create");
	const toUpdateRole = (id: number) => navigate(`/roles/update/${id}`);
	return (
		<Grid container>
			<Grid xs={12}>
				<PageTitle title="Funções" />
			</Grid>

			<Grid xs={12} container spacing={1} justifyContent={"space-between"}>
				<Grid xs={12} sm={6}>
					<InputSearch onChange={handleSearch} value={search} />
				</Grid>

				<Grid xs={12} sm={6}>
					<Button variant="contained" onClick={toCreateRole} fullWidth>
						Adicionar Função
					</Button>
				</Grid>
			</Grid>

			<Grid xs={12}>
				<ListEmpty dataList={rolesState.data} label="Funções" action={toCreateRole} />
				<List>
					{rolesState.data.filter(isMatchedSearch).map((role) => (
						<ListItem disablePadding key={role.id}>
							<ListItemButton onClick={() => toUpdateRole(role.id)}>
								<ListItemText primary={role.name} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Grid>
		</Grid>
	);
}
