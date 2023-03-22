import React from "react";

// components
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface AutocompleteControlledProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<any>;
	options: { id: number; text: string }[];
	nameField: string;
	label: string;
	selectedOptions?: number[];
	noOptionsText: string;
	loading?: boolean;
	size?: "small" | "medium" | undefined;
}

export default function AutocompleteControlled(props: AutocompleteControlledProps) {
	const {
		control,
		options,
		nameField,
		selectedOptions = [],
		noOptionsText,
		loading,
		label,
		size = "small",
	} = props;
	return (
		<Controller
			control={control}
			name={nameField}
			render={({ field: { onChange, value }, fieldState }) => (
				<Autocomplete
					onChange={(event, item) => {
						onChange(item?.id);
					}}
					value={options.find((option) => option.id === value)}
					size={size}
					id={nameField}
					options={options}
					getOptionDisabled={(option) => selectedOptions.includes(option.id)}
					getOptionLabel={(option) => `${option.id} - ${option.text}`}
					noOptionsText={noOptionsText}
					loadingText={"Carregando..."}
					loading={loading}
					isOptionEqualToValue={(option, value) => {
						return option.id === value.id;
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label={label}
							error={!!fieldState.error?.message}
							helperText={fieldState.error?.message}
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<>
										{loading ? <CircularProgress color="inherit" size={20} /> : null}
										{params.InputProps.endAdornment}
									</>
								),
							}}
						/>
					)}
				/>
			)}
		/>
	);
}
