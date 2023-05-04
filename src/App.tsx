import React from "react";
import MatrixRain from "./themes/matrix/MatrixRain";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { GlobalStyled } from "./themes/matrix/GlobalStyle";

import { persistor} from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <>
      <PersistGate persistor={persistor}>
      <MatrixRain />
      <AppRoutes />
      <GlobalStyled/>
      </PersistGate>
    </>
  );
}

export default App;
