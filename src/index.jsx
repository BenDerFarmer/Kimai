/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { Kimai } from "./kimai";
import { Route, HashRouter } from "@solidjs/router";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Dock } from "./components/Dock";
import { Bar } from "./components/Bar";
import { TimeSheetModal } from "./components/TimeSheetModal";
import { Settings } from "./pages/Settings";
import { Customers } from "./pages/Customers";
import { ErrorModal } from "./components/ErrorModal";
import { Projects } from "./pages/Projects";
import { Activities } from "./pages/Activities";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

const theme = localStorage.getItem("theme");
if (theme != null) {
  document.documentElement.setAttribute("data-theme", theme);
}

const Layout = (props) => {
  return (
    <>
      <Bar />
      <TimeSheetModal />
      <ErrorModal />
      {props.children}
      <Dock />
    </>
  );
};

if (Kimai.apiKey == null || Kimai.jsonApi == null) {
  render(() => <Login />, root);
} else {
  render(
    () => (
      <HashRouter root={Layout}>
        <Route path="/" component={Dashboard} />
        <Route path="/settings" component={Settings} />
        <Route path="/customers" component={Customers} />
        <Route path="/projects" component={Projects} />
        <Route path="/activities" component={Activities} />
      </HashRouter>
    ),
    root,
  );
}
