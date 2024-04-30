import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MessageProvider } from "./context/messageContext";
import { UserProvider } from "./context/userContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <BrowserRouter>
    <MessageProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </MessageProvider>
  </BrowserRouter>,
);
