import { useNavigate, NavigateFunction } from "react-router-dom";

export let navigateSetter = {} as NavigateFunction;

const NavigateSetter = () => {
	navigateSetter = useNavigate();

	return null;
};

export default NavigateSetter;
