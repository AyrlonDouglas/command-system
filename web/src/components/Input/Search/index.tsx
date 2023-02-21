//components
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface InputSearchProps {
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
	label?: string;
	placeholder?: string;
	size?: "small" | "medium";
	variant?: "outlined" | "filled" | "standard";
	fullWidth?: boolean;
}

export default function InputSearch({
	value,
	onChange,
	label,
	placeholder,
	...props
}: InputSearchProps) {
	return (
		<TextField
			label={label ? label : "Pesquise aqui"}
			placeholder={placeholder ? placeholder : ""}
			value={value}
			onChange={onChange}
			InputProps={{
				endAdornment: (
					<InputAdornment position="start">
						<SearchIcon />
					</InputAdornment>
				),
			}}
			size="small"
			variant="outlined"
			fullWidth
			{...props}
		/>
	);
}
