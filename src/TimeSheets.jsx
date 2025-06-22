import { createSignal, onMount, Show } from "solid-js";
import { Kimai } from "./kimai";
import { openTimeSheetModal } from "./components/TimeSheetModal";

const [timesheets, setTimesheets] = createSignal([]);

export async function refrechTimeSheets() {
  setTimesheets(await Kimai.getTimesheets());
}

export function TimeSheets() {
  const [projects, setProjects] = createSignal([]);

  onMount(async () => {
    setProjects(await Kimai.cache.getProjects());
    setTimesheets(await Kimai.getTimesheets());
  });

  let lastDate = undefined;

  const timeTitle = (beginDate) => {
    lastDate = beginDate;

    // magic from https://stackoverflow.com/a/20974167
    const dt = new Date(beginDate.getFullYear(), 0, 1);
    const week = Math.ceil(((beginDate - dt) / 86400000 + dt.getDay() + 1) / 7);

    return (
      <li class="bg-base-300 p-4 pb-2 text-xs opacity-60 tracking-wide">
        {beginDate.toDateString() + " KW: " + week}
      </li>
    );
  };

  const timeSheetElement = (ts) => {
    const beginDate = new Date(ts.begin.split("T")[0]);
    return (
      <>
        <Show
          when={
            lastDate == undefined ||
            lastDate.getDate() !== beginDate.getDate() ||
            lastDate.getMonth() !== beginDate.getMonth() ||
            lastDate.getFullYear() !== beginDate.getFullYear()
          }
        >
          {timeTitle(beginDate)}
        </Show>
        <li
          class="list-row"
          onClick={() => {
            openTimeSheetModal();
          }}
        >
          <div>
            <div>
              {new Date(ts.end).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </div>
            <div>
              {new Date(ts.begin).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </div>
          </div>
          <div>
            <div>{projects()[ts.project].parentTitle}</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              {projects()[ts.project].name}
            </div>
          </div>
          <button class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </li>
      </>
    );
  };

  return (
    <ul class="list bg-base-100 rounded-box shadow-md pb-16">
      <For each={timesheets()}>{(ts) => timeSheetElement(ts)}</For>
    </ul>
  );
}
