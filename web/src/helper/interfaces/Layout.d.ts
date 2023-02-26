import { routesApp } from "../constants/routes";
import { PermissionProps } from "./Permission";

export interface LayoutDataProps {
	permissions: PermissionProps[];
}

export interface MainMenuProps {
	title: MainMenuTitleType;
	// eslint-disable-next-line @typescript-eslint/ban-types
	icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
		muiName: string;
	};
}

export interface SecondaryMenuProps {
	path: string;
	title: SecondaryMenuTitleType;
	section: MainMenuTitleType;
	permissionsToAcces: PermissionProps[];
}

export type MainMenuTitleType =
	| "Comandas"
	| "Pedidos"
	| "Cardápio"
	| "Usuários"
	| "Configurações"
	| "sair"
	| "Permissões";
export type SecondaryMenuTitleType =
	| "Comandas"
	| "Pedidos"
	| "Itens"
	| "Profissionais"
	| "Categorias"
	| "Clientes"
	| "Configurações"
	| "Funções"
	| "Funções"
	| "Conta";
