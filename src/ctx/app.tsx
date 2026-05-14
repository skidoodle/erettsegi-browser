"use client";

import {
	createContext,
	useReducer,
	type Dispatch,
	type ReactNode,
} from "react";

interface State {
	flPdfLink: string;
	utPdfLink: string;
	flZipLink: string;
	utZipLink: string;
	flMp3Link: string;
	selectedSubject: string;
	selectedYear: string;
	selectedPeriod: string;
	selectedLevel: string;
	years: string[];
}

const initialState: State = {
	flPdfLink: "",
	utPdfLink: "",
	flZipLink: "",
	utZipLink: "",
	flMp3Link: "",
	selectedSubject: "",
	selectedYear: "",
	selectedPeriod: "",
	selectedLevel: "",
	years: [],
};

type Action =
	| { type: "SET_FL_PDF_LINK"; payload: string }
	| { type: "SET_UT_PDF_LINK"; payload: string }
	| { type: "SET_FL_ZIP_LINK"; payload: string }
	| { type: "SET_UT_ZIP_LINK"; payload: string }
	| { type: "SET_FL_MP3_LINK"; payload: string }
	| { type: "SET_SELECTED_SUBJECT"; payload: string }
	| { type: "SET_SELECTED_YEAR"; payload: string }
	| { type: "SET_SELECTED_PERIOD"; payload: string }
	| { type: "SET_SELECTED_LEVEL"; payload: string }
	| { type: "SET_YEARS"; payload: string[] };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_FL_PDF_LINK":
			return { ...state, flPdfLink: action.payload };
		case "SET_UT_PDF_LINK":
			return { ...state, utPdfLink: action.payload };
		case "SET_FL_ZIP_LINK":
			return { ...state, flZipLink: action.payload };
		case "SET_UT_ZIP_LINK":
			return { ...state, utZipLink: action.payload };
		case "SET_FL_MP3_LINK":
			return { ...state, flMp3Link: action.payload };
		case "SET_SELECTED_SUBJECT":
			return { ...state, selectedSubject: action.payload };
		case "SET_SELECTED_YEAR":
			return { ...state, selectedYear: action.payload };
		case "SET_SELECTED_PERIOD":
			return { ...state, selectedPeriod: action.payload };
		case "SET_SELECTED_LEVEL":
			return { ...state, selectedLevel: action.payload };
		case "SET_YEARS":
			return { ...state, years: action.payload };
		default:
			return state;
	}
};

export const AppContext = createContext<{
	state: State;
	dispatch: Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => null,
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};
