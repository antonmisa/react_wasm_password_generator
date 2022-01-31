import React from "react";
import ReactDom from "react-dom";
import { StyledEngineProvider } from '@mui/material/styles';
import App from "./component/App";

ReactDom.render(<StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>,
  document.querySelector("#root")
  );