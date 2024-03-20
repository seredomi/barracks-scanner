import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider, useSelector } from 'react-redux';
import store from './store';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
