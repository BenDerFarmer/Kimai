/* @refresh reload */
import { render } from "solid-js/web";
import { Kimai } from "./kimai";

import "./index.css";
import Dashboard from "./Dashboard";
import Login from "./Login";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

if (Kimai.apiKey == null || Kimai.jsonApi == null) {
  render(() => <Login />, root);
} else {
  render(() => <Dashboard />, root);
}
