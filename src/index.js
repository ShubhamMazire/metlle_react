import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import theme from "./Common/Theme";

// ------------------ redux   --------------------------------------------------------------------------------------------
import { createStore } from "redux";
import Reducer from "./Common/Reducer";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const store = createStore(Reducer);
const persistor = persistStore(store);

// nui themeprovider

window.process = {};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={<div loading={"true"} />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
