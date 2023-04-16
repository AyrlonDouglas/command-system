import { Controller, Control } from "react-hook-form";
import { TextField } from "@mui/material";

interface InputTextFieldControlledProps {
	control: Control<any>;
	nameField: string;
	label: string;
	type?: React.HTMLInputTypeAttribute | undefined;
	accept?: string | undefined;
}

export default function InputTextFieldControlled({
	control,
	nameField,
	label,
	type,
	accept,
}: InputTextFieldControlledProps) {
	return (
		<Controller
			name={nameField}
			control={control}
			render={({ field, fieldState }) => (
				<TextField
					{...field}
					id={nameField}
					label={label}
					name={nameField}
					variant="outlined"
					size="small"
					error={!!fieldState.error?.message}
					helperText={fieldState.error?.message}
					fullWidth
					type={type}
					inputProps={{ accept }}
				/>
			)}
		/>
	);
}
