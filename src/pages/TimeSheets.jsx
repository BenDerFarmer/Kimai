import { createEffect, createSignal, onMount, Show } from "solid-js";
import { Kimai } from "../kimai";
import { openTimeSheetModal } from "../lib/timesheet";
import { OptionsIcon } from "../components/Icons";

const [timesheets, setTimesheets] = createSignal([]);
const [page, setPage] = createSignal(1);

export async function refrechTimeSheets() {
  setTimesheets(await Kimai.getTimesheets({ page: page() }));
}

export function TimeSheets() {
  const [projects, setProjects] = createSignal([]);

  onMount(async () => {
    setProjects(await Kimai.cache.getProjects());
    refrechTimeSheets();
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

    const project = projects()[ts.project];
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
        <li class="list-row">
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
          <div
            onClick={() => {
              openTimeSheetModal({
                begin: ts.begin,
                end: ts.end,
                id: ts.id,
                project: ts.project,
                activity: ts.activity,
                desc: ts.description,
              });
            }}
          >
            <div>{project != undefined ? project.parentTitle : "Loading"}</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              {project != undefined ? project.name : "Loading"}
            </div>
          </div>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-square btn-ghost">
              <OptionsIcon />
            </div>
            <ul
              tabindex="0"
              class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <a
                  onClick={() => {
                    openTimeSheetModal({
                      begin: ts.begin,
                      end: ts.end,
                      project: ts.project,
                      activity: ts.activity,
                      desc: ts.description,
                    });
                  }}
                >
                  Duplizieren
                </a>
              </li>
              <li>
                <a
                  onClick={async () => {
                    await Kimai.deleteTimeSheet(ts.id);
                    refrechTimeSheets();
                  }}
                  class="text-error"
                >
                  Löschen
                </a>
              </li>
            </ul>
          </div>
        </li>
      </>
    );
  };

  return (
    <ul class="list bg-base-100 rounded-box shadow-md pb-16">
      <For each={timesheets()}>{(ts) => timeSheetElement(ts)}</For>

      <li class="bg-base-300 p-4 text-xs opacity-60 tracking-wide join flex justify-center">
        <button
          class="join-item btn"
          onClick={() => {
            if (page() == 1) return;
            setPage(page() - 1);
            refrechTimeSheets();
          }}
        >
          «
        </button>
        <button class="join-item btn">Seite {page()}</button>
        <button
          class="join-item btn"
          onClick={() => {
            setPage(page() + 1);
            refrechTimeSheets();
          }}
        >
          »
        </button>
      </li>
    </ul>
  );
}
