import { StartStopButton } from "./StartStopButton";

export function Bar() {
  return (
    <div class="drawer">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <div class="navbar bg-base-100 shadow-sm">
          <div class="flex-none lg:hidden">
            <label
              for="my-drawer-3"
              aria-label="open sidebar"
              class="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block h-6 w-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <a class="btn btn-ghost text-xl">ETM - Kimai</a>

          <div class="hidden flex-none lg:block">
            <ul class="menu menu-horizontal">
              <li>
                <a>Navbar Item 1</a>
              </li>
              <li>
                <a>Navbar Item 2</a>
              </li>
            </ul>
          </div>
          <div class="navbar-end">
            <StartStopButton />
          </div>
        </div>
      </div>
      <div class="drawer-side">
        <label
          for="my-drawer-3"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu bg-base-200 min-h-full w-60 p-4">
          <h2 class="btn btn-ghost text-xl">Menu</h2>
          <div class="divider">Zeiterfassung</div>
          <li>
            <a>Zeiten</a>
          </li>
          <li>
            <a>Kalender</a>
          </li>
          <li>
            <a>Stundenzettel</a>
          </li>
          <div class="divider">Administration</div>
          <li>
            <a>Projekte</a>
          </li>
          <li>
            <a>Kunden</a>
          </li>
          <li>
            <a>Tätigkeiten</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
