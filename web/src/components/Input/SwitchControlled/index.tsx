import { Controller, Control } from "react-hook-form";
import { FormControlLabel, Switch } from "@mui/material";

interface InputSwitchCOntrolledProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<any>;
	nameField: string;
	label: string;
}
export default function InputSwitchControlled({
	control,
	label,
	nameField,
}: InputSwitchCOntrolledProps) {
	return (
		<Controller
			name={nameField}
			control={control}
			render={({ field: { onChange, value } }) => (
				<FormControlLabel
					control={
						<Switch
							name={nameField}
							id={nameField}
							onChange={(event, item) => {
								onChange(item);
							}}
							checked={value}
						/>
					}
					label={label}
				/>
			)}
		/>
	);
}
