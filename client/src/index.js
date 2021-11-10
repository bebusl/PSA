import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store";
import "./styles/css/index.css";
import App from "./App";

const persistor = persistStore(store);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor} />
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
