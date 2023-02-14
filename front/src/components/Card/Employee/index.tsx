//components
import { CardActionArea, Unstable_Grid2 as Grid, Typography } from "@mui/material";
import { employeeDataProps } from "../../../helper/interfaces/Employee";
//styles
import { GridContainer } from "./styles";

interface CardEmployeeProps {
	employee: employeeDataProps;
	canEdit?: boolean;
	onClick: (id: number) => void;
}

export default function CardEmployee({ canEdit, onClick, employee }: CardEmployeeProps) {
	const typeTranslator = (type: string) => {
		switch (type) {
			case "admin":
				return "administrador";
			case "bot":
				return "robô";
			case "standard":
				return "padrão";
			default:
				return "padrão";
		}
	};

	return (
		<CardActionArea
			sx={{ borderRadius: "0.25rem", height: "100%" }}
			onClick={() => {
				onClick(employee.id);
			}}
		>
			<Grid sx={{ height: "100%" }}>
				<GridContainer
					container
					flexDirection={"column"}
					justifyContent={"space-between"}
					sx={{ padding: "0rem 0.5rem 0" }}
				>
					<Grid xs={12} container justifyContent={"space-between"}>
						<Grid>
							<Typography variant="body2">{`${employee.firstName} ${employee.lastName}`}</Typography>
						</Grid>
						<Grid>
							<Typography
								variant="caption"
								sx={{
									color: (theme) =>
										employee.isActive ? theme.palette.success.main : theme.palette.error.main,
									fontWeight: 700,
								}}
							>{`${employee.isActive ? "ativo" : "inativo"}`}</Typography>
						</Grid>
					</Grid>

					<Grid xs={12} container justifyContent={"space-between"}>
						<Grid>
							<Typography variant="body2">
								{"Código: "}
								<Typography component="span" variant="body2" fontWeight={700}>
									{employee.employeeCode}
								</Typography>
							</Typography>
						</Grid>
						<Grid>
							<Typography variant="body2">{`tipo: ${typeTranslator(employee.type)}`}</Typography>
						</Grid>
					</Grid>
				</GridContainer>
			</Grid>
		</CardActionArea>
	);
}
