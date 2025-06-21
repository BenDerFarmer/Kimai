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
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function BTes5() {
  return (
    <div class="navbar ">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>
        <a class="btn btn-ghost text-xl">ETM</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class=" px-1 w-4xl h-full">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul class="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
