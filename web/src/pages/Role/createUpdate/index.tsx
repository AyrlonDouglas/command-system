import React, { useEffect, useState } from "react";
// router
import { useNavigate, useParams } from "react-router-dom";

// MUI
import {
	Unstable_Grid2 as Grid,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Checkbox,
	FormHelperText,
	FormControl,
	Button,
} from "@mui/material";
// icons
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
//Components
import PageTitle from "../../../components/common/PageTitle";
import InputTextFieldControlled from "../../../components/Input/TextFieldControlled";
// validator
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Redux
import {
	createRoleRequest,
	getAllPermissionsRequest,
	getRoleByIdRequest,
	removeRoleRequest,
	updateRoleRequest,
} from "../../../store/ducks/roles/slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { PermissionEntitiesTypes, PermissionProps } from "../../../helper/interfaces/Permission";
import DialogRemovalConfirmation from "../../../components/Dialog/RemovalConfirmation";

const schema = yup.object().shape({
	name: yup.string().required("Preencha o nome"),
	permissionsIds: yup
		.array()
		.min(1, "Escolha ao menos um permissão")
		.required("Escolha ao menos um permissão")
		.nonNullable(),
});

export default function RoleCreateUpdate() {
	const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { idRole } = useParams();
	const { roles: rolesState } = useAppSelector((state) => state);

	useEffect(() => {
		dispatch(getAllPermissionsRequest());

		if (idRole) {
			dispatch(getRoleByIdRequest(idRole));
		}
		return () => {
			resetField("name");
			resetField("permissionsIds");
		};
	}, []);

	useEffect(() => {
		if (idRole && rolesState.data.length > 0) {
			const roleFiltered = rolesState.data.filter((role) => role.id.toString() === idRole)[0];

			const permissionsIdsFiltered = roleFiltered.rolePermissions
				.filter((rolePermission) => Boolean(rolePermission))
				.map((rolePermission) => rolePermission.permission.id?.toString()) as string[];

			setValue("name", roleFiltered.name);
			setValue("permissionsIds", permissionsIdsFiltered);
		}
	}, [rolesState.data, idRole]);

	const allPermissions = useAppSelector((state) => state.roles.allPermissions);
	const {
		handleSubmit,
		control,
		formState: { errors, defaultValues },
		resetField,
		setValue,
		getValues,
		trigger,
		// reset,
		watch,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: "" as string,
			permissionsIds: [] as string[],
		},
	});
	// console.log("getValues", getValues().permissionsIds);

	const groupPermissionsByEntity = (permissions: PermissionProps[]) => {
		interface PermissionGroupedProps {
			name: PermissionEntitiesTypes;
			items: PermissionProps[];
		}
		const group: PermissionGroupedProps[] = [];

		permissions.forEach((permission) => {
			const hasPermissionInGroup = group.some((element) => {
				if (permission.entity === element.name) {
					element.items.push(permission);
					return true;
				} else {
					return false;
				}
			});

			if (permission.entity === "ORDER-ITEM" || permission.entity === "ROLE-PERMISSION") {
				return;
			}

			if (!hasPermissionInGroup) {
				group.push({ name: permission.entity, items: [permission] });
			}
		});

		return group;
	};

	const entityNames: { [key: string]: string } = {
		CATEGORY: "Categoria",
		COMMAND: "Comanda",
		COMPANY: "Companhia",
		EMPLOYEE: "Colaboradores",
		ITEM: "Items",
		ORDER: "Pedidos",
		PERMISSION: "Permissões",
		ROLE: "Funções",
		TABLE: "Mesas",
	};

	const translateEntity = (entity: PermissionEntitiesTypes) => {
		return entityNames[entity] || entity;
	};

	const onSubmit = (data: typeof defaultValues) => {
		if (idRole) {
			dispatch(updateRoleRequest({ ...data, id: idRole }));
		} else {
			dispatch(createRoleRequest(data));
		}
		navigate("/roles");
	};

	const onRemove = () => {
		dispatch(removeRoleRequest({ id: idRole }));
		navigate("/roles");
	};

	const closeModalConfirmation = () => {
		setOpenModalConfirmation(false);
	};
	const handleOpenModalConfirmation = () => {
		setOpenModalConfirmation(true);
	};

	return (
		<>
			<Grid container>
				<Grid xs={12}>
					<PageTitle title={idRole ? "Editar função" : "Criar função"} />
				</Grid>

				<Grid component={"form"} xs={12} container spacing={2} onSubmit={handleSubmit(onSubmit)}>
					<Grid>
						<InputTextFieldControlled
							control={control}
							label={"Nome da função"}
							nameField={"name"}
						/>
					</Grid>

					<Grid xs={12}>
						<FormControl fullWidth error={!!errors.permissionsIds}>
							<TableContainer component={Paper}>
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
											<TableCell align="left">Módulo</TableCell>
											<TableCell align="center">Visualizar</TableCell>
											<TableCell align="center">Criar</TableCell>
											<TableCell align="center">Editar</TableCell>
											<TableCell align="center">Deletar</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{groupPermissionsByEntity(allPermissions).map((group) => {
											return (
												<TableRow
													key={group.name}
													sx={{
														"&:last-child td, &:last-child th": { border: 0 },
														"&:hover": { background: (t) => t.palette.background.default },
														"& th": { padding: "0 16px" },
													}}
												>
													<TableCell component="th" scope="row" align="left">
														{translateEntity(group.name)}
													</TableCell>
													{group.items.map((item) => {
														return (
															<>
																<TableCell component="th" scope="row" align="center" key={item.id}>
																	<Controller
																		name="permissionsIds"
																		key={item.id}
																		control={control}
																		render={({ field }) => (
																			<Checkbox
																				onBlur={field.onBlur}
																				name={field.name}
																				ref={field.ref}
																				value={item.id}
																				checked={field.value.includes(
																					item.id?.toString() as string
																				)}
																				icon={<RadioButtonUncheckedOutlinedIcon />}
																				checkedIcon={<CheckCircleOutlineOutlinedIcon />}
																				onChange={(event, checked) => {
																					if (checked) {
																						field.onChange([...field.value, event.target.value]);
																					} else {
																						field.onChange(
																							field.value.filter((value) => {
																								return value.toString() !== event.target.value;
																							})
																						);
																					}
																				}}
																			/>
																		)}
																	/>
																</TableCell>
															</>
														);
													})}
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
							{errors.permissionsIds ? (
								<FormHelperText sx={{ textAlign: "right" }}>
									{errors.permissionsIds.message}
								</FormHelperText>
							) : null}
						</FormControl>
					</Grid>
					<Grid container spacing={1} justifyContent={"flex-end"} xs={12}>
						<Grid>
							<Button variant="outlined" onClick={() => navigate(-1)}>
								Cancelar
							</Button>
						</Grid>
						{idRole ? (
							<Grid>
								<Button variant="contained" onClick={handleOpenModalConfirmation} color="error">
									{"Remover função"}
								</Button>
							</Grid>
						) : null}
						<Grid>
							<Button variant="contained" type="submit">
								{idRole ? "Editar função" : "Criar Função"}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<DialogRemovalConfirmation
				title={`Tem certeza que deseja remover a função ${getValues("name")}?`}
				subtitle={"Essa ação é irreversível!"}
				onConfirmation={onRemove}
				open={openModalConfirmation}
				handleClose={closeModalConfirmation}
			/>
		</>
	);
}
