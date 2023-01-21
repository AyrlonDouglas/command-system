import { Typography } from "@mui/material";

interface listEmptyProps {
	label: string;
	action?: () => void;
	dataList: unknown[];
}

export default function ListEmpty({ action, label, dataList }: listEmptyProps) {
	return (
		<>
			{dataList.length === 0 ? (
				<Typography sx={{ margin: "1rem 0.25rem" }}>
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
			) : null}
		</>
	);
}
