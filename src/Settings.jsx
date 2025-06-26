import { createSignal, onMount } from "solid-js";
import { Kimai } from "./kimai";

export function Settings() {
  const [user, setUser] = createSignal(null);

  onMount(async () => {
    setUser(await Kimai.getCurrentUser());
  });

  return (
    <div class="flex w-full flex-col p-5">
      <h1 class="text-2xl">Profil</h1>
      <div class="divider" />
      <div class="flex flex-row justify-evenly items-center">
        <div class="avatar avatar-placeholder">
          <div class="bg-accent text-neutral-content w-16 rounded-full">
            <span class="text-3xl">
              {user() != null ? user().initials : "L"}
            </span>
          </div>
        </div>
        <h3 class="text-xl">{user() != null ? user().username : "Loading"}</h3>
        <button
          class="btn btn-soft btn-error"
          onClick={() => {
            Kimai.logout();
            location.replace("/");
          }}
        >
          Logout
        </button>
      </div>
      <h1 class="text-2xl pt-10">Präferenzen</h1>
      <div class="divider" />
      <h3 class="text-xl pb-5">Themes</h3>
      <Themes />
    </div>
  );
}

function Themes() {
  const themes = [
    { value: "default", name: "System" },
    { value: "light", name: "Hell" },
    { value: "dark", name: "Dunkel" },
    { value: "nord", name: "Nord" },
    { value: "night", name: "Nacht" },
  ];

  return (
    <fieldset class="fieldset pl-5">
      <For each={themes}>
        {(theme, _) => (
          <label class="flex gap-2 cursor-pointer items-center">
            <input
              type="radio"
              name="theme-radios"
              class="radio radio-sm theme-controller"
              value={theme.value}
              checked={localStorage.getItem("theme") == theme.value}
              onClick={() => localStorage.setItem("theme", theme.value)}
            />
            {theme.name}
          </label>
        )}
      </For>
    </fieldset>
  );
}
