import { createContext, useReducer, useContext } from "react";

const initialState = {
  selectorOption: {
    label: "Last 5 minutes",
    value: 5 * 60 * 1000,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
   

    case "SET_SELECTOR_OPTION":
      return {
        ...state,
        selectorOption: action.payload,
        isSelectorOpen: false,
      };
    default:
      return state;
  }
};

const AppContext = createContext();

export const useAppState = () => {
  return useContext(AppContext)[0];
};

export const useAppDispatch = () => {
  return useContext(AppContext)[1];
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
