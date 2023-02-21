import { Controller, Control, FieldErrors } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
interface InputSelectControlledProps {
	//TODO: ajustar tipo do control
	control: Control<any>;
	nameField: string;
	options: string[];
	label: string;
	error: FieldErrors<{ [key: string]: string }>;
}

export default function InputSelectControlled({
	control,
	nameField,
	options,
	label,
	error,
}: InputSelectControlledProps) {
	return (
		<FormControl fullWidth error={!!error[nameField]?.message} size="small">
			<InputLabel id={`select-${label}`}>{label}</InputLabel>
			<Controller
				name={nameField}
				control={control}
				render={({ field, fieldState }) => (
					<Select labelId={label} {...field} id={nameField} name={nameField} label={label}>
						{options.map((el) => (
							<MenuItem value={el} key={el}>
								{el}
							</MenuItem>
						))}
					</Select>
				)}
			/>
			{error[nameField]?.message ? (
				<FormHelperText error={Boolean(error[nameField]?.message)}>
					{error[nameField]?.message}
				</FormHelperText>
			) : null}
		</FormControl>
	);
}
