import React, { createContext, useReducer, Props } from "react";



let AppContext = createContext();

const initialState = {
  count: 0
}

let reducer = (state, action) => {
  switch(action.type) {
    case "setCount": {
      return { ...state, count: action.user }
    }
  }
  return state;
};

function AppContextProvider(props) {
  const fullInitialState = {
    ...initialState,
  }

  let [state, dispatch] = useReducer(reducer, fullInitialState);
  let value = { state, dispatch };


  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };