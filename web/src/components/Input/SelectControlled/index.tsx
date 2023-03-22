import { Controller, Control } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
interface InputSelectControlledProps {
	//TODO: ajustar tipo do control
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<any>;
	nameField: string;
	options: { id: number; text: string }[];
	label: string;
	emptyField?: boolean;
}

export default function InputSelectControlled({
	control,
	nameField,
	options,
	label,
	emptyField = false,
}: InputSelectControlledProps) {
	const handleOptions = () => {
		const values = [...options];
		if (emptyField) {
			values.unshift({ id: -1, text: "-" });
		}
		return values;
	};

	return (
		<FormControl fullWidth error={!!control.getFieldState(nameField).error} size="small">
			<InputLabel id={`select-${label}`}>{label}</InputLabel>
			<Controller
				name={nameField}
				control={control}
				render={({ field, fieldState }) => (
					<>
						<Select labelId={label} {...field} id={nameField} name={nameField} label={label}>
							{handleOptions().map(({ id, text }) => (
								<MenuItem value={id} key={id}>
									{text}
								</MenuItem>
							))}
						</Select>
						{fieldState.error ? (
							<FormHelperText error={!!fieldState.error}>{fieldState.error.message}</FormHelperText>
						) : null}
					</>
				)}
			/>
		</FormControl>
	);
}
