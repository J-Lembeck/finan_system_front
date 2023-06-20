import { CSSProperties, ReactNode } from "react";

export interface ITopButtons {
	pageTittle: string;
	mainButtonIcon?: ReactNode;
	mainButtonTitle: string;
	// mainButtonDropDown?: DropDownItem[];
	// secondaryButton?: SecudaryButton;
	handleNew?: (arg: any) => void;
	handleEdit?: (arg: any) => void;
	handleDelete?: (arg: any) => void;
	handleSearch?: (arg: any) => void;
	handleFilter?: (arg: any) => void;
	isEditable?: boolean;
	isDeletable?: boolean;
	// customButtons?: CustomButtons[];
	settingsButton?: boolean;
	searchPlaceholder?: string;
	disabledMainButton?: boolean;
	mainButtonStyles?: CSSProperties
	// multipleSearch?: IMultipleSearch;
}