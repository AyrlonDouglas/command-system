import { Typography, Box } from "@mui/material";

interface PageTitleProps {
	title: string;
}

export default function PageTitle(props: PageTitleProps) {
	return (
		<Box sx={{ margin: "0 0 1rem" }}>
			<Typography variant="h5" fontWeight={"bold"}>
				{props.title}
			</Typography>
		</Box>
	);
}
