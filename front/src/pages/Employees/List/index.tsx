import { Unstable_Grid2 as Grid } from "@mui/material";
import PageTitle from "../../../components/PageTitle";

export default function EmployeesList() {
	return (
		<Grid container>
			<Grid xs={12}>
				<PageTitle title="Profissionais" />
			</Grid>
			<Grid></Grid>
		</Grid>
	);
}
