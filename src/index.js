import React from "react";
import ReactDOM from "react-dom/client";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import App from "App";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import LXCReducer from "redux/reducer";
const store = createStore(LXCReducer);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
