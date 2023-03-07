import { Typography, Unstable_Grid2 as Grid } from "@mui/material";

interface listEmptyProps {
	label: string;
	action?: () => void;
	dataList: unknown[];
}

export default function ListEmpty({ action, label, dataList }: listEmptyProps) {
	return (
		<>
			{dataList.length === 0 ? (
				<Grid xs={12}>
					<Typography>
						{`Lista de ${label} vazia${action ? ", " : "."}`}
						{action ? (
							<Typography
								onClick={action}
								component={"span"}
								color="primary"
								sx={{ ":hover": { textDecoration: "underline" }, cursor: "pointer" }}
							>
								{"adicione aqui."}
							</Typography>
						) : null}
					</Typography>
				</Grid>
			) : null}
		</>
	);
}
