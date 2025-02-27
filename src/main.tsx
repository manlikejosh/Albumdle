import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import EndScreen from "./components/Modals/Stats/EndScreen";
// - Return index.html for all routes
// - This is automatic in Vite/CRA, but might need config in Nginx/Express

let numGuesses = 1;
let result = true;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
    <EndScreen numGuesses={numGuesses} result={result} />
  </StrictMode>
);
