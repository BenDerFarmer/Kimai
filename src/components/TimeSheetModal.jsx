import { createSignal, onMount, createEffect } from "solid-js";
import { Kimai } from "../kimai";
import {
  beginDate,
  setBeginDate,
  duration,
  setDuration,
  endTime,
  setEndTime,
  customer,
  project,
  setProject,
  activity,
  setActivity,
  desc,
  setDesc,
  tags,
  setTags,
  projects,
  setProjects,
  timeSheetModalID,
  saveTimesheet,
  closeTimeSheetModal,
} from "../lib/timesheet";

export function TimeSheetModal() {
  const [activitys, setActivitys] = createSignal([]);
  const [customers, setCustomers] = createSignal([]);

  onMount(async () => {
    setActivitys(await Kimai.getTasks());
    setCustomers(await Kimai.getCustomers());
  });

  const selectDuration = (value) => {
    const startDate = new Date(beginDate());
    const durationSplit = value.split(":");

    startDate.setHours(
      startDate.getHours() + parseInt(durationSplit[0]),
      startDate.getMinutes() + parseInt(durationSplit[1]),
    );

    if (isNaN(startDate.getHours())) return;

    setEndTime(
      startDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    );
  };

  createEffect(() => {
    if (endTime() == null) return;

    const startDate = new Date(beginDate());
    const endTimeSplit = endTime().split(":");

    let hour = endTimeSplit[0] - startDate.getHours();
    let minute = endTimeSplit[1] - startDate.getMinutes();

    if (minute < 0) {
      minute = 60 + minute;
      hour--;
    }

    if (isNaN(hour)) return;

    setDuration(`${hour}:${minute}`);
  });

  const selectCustomer = async (e) => {
    const id = e.currentTarget.value;

    setProjects(
      await Kimai.getProjects({
        customer: id,
      }),
    );
  };

  return (
    <dialog id={timeSheetModalID} class="modal">
      <div class="modal-box max-w-lg">
        <h3 class="font-bold text-lg mb-4">Zeit erfassen</h3>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control col-span-2">
            <label class="label">
              <span class="label-text">Von</span>
            </label>
            <input
              type="datetime-local"
              class="input input-bordered w-full"
              value={beginDate()}
              onInput={(e) => setBeginDate(e.currentTarget.value)}
            />
          </div>

          <div class="form-control dropdown">
            <label class="label">
              <span class="label-text">Dauer</span>
            </label>
            <input
              type="text"
              placeholder="0:00"
              tabindex="0"
              role="button"
              class="input input-bordered w-full"
              value={duration()}
              onChange={(e) => selectDuration(e.currentTarget.value)}
            />
            <ul
              tabindex="0"
              class="dropdown-content menu bg-base-100 rounded-box z-1 w-64 p-2 shadow-sm"
            >
              <For each={[1, 2, 3, 4]}>
                {(hour, _) => (
                  <li class="flex flex-row">
                    <a onClick={() => selectDuration(hour + ":00")}>
                      {hour + ":00"}
                    </a>
                    <a onClick={() => selectDuration(hour + ":15")}>
                      {hour + ":15"}
                    </a>
                    <a onClick={() => selectDuration(hour + ":30")}>
                      {hour + ":30"}
                    </a>
                    <a onClick={() => selectDuration(hour + ":45")}>
                      {hour + ":45"}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Ende</span>
            </label>

            <input
              type="time"
              class="input input-bordered w-full"
              value={endTime()}
              onInput={(e) => setEndTime(e.currentTarget.value)}
            />
          </div>

          <div class="form-control col-span-2">
            <label class="label">
              <span class="label-text">Kunde</span>
            </label>
            <select
              class="select select-bordered w-full"
              id="customer"
              value={customer()}
              onChange={(e) => selectCustomer(e)}
            >
              <option value="">– wähle –</option>

              <For each={customers()}>
                {(cust, _) => <option value={cust.id}>{cust.name}</option>}
              </For>
            </select>
          </div>

          <div class="form-control col-span-2">
            <label class="label">
              <span class="label-text">Projekt*</span>
            </label>
            <select
              class="select select-bordered w-full"
              id="project"
              value={project()}
              onChange={(e) => setProject(e.currentTarget.value)}
            >
              <option value="">– wähle –</option>

              <For each={projects()}>
                {(proj, _) => (
                  <option data-customer={proj.customer} value={proj.id}>
                    {proj.name}
                  </option>
                )}
              </For>
            </select>
          </div>

          <div class="form-control col-span-2">
            <label class="label">
              <span class="label-text">Tätigkeit*</span>
            </label>
            <select
              class="select select-bordered w-full"
              value={activity()}
              onChange={(e) => setActivity(e.currentTarget.value)}
            >
              <option value="">– wähle –</option>
              <For each={activitys()}>
                {(task, _) => <option value={task.id}>{task.name}</option>}
              </For>
            </select>
          </div>

          <div class="form-control col-span-2">
            <label class="label">
              <span class="label-text">Beschreibung</span>
            </label>
            <textarea
              class="textarea textarea-bordered w-full"
              rows="3"
              value={desc()}
              onInput={(e) => setDesc(e.currentTarget.value)}
            />
          </div>

          <div class="form-control col-span-2">
            <label class="label">
              <span class="label-text">Schlagworte</span>
            </label>
            <input
              type="text"
              placeholder="Stichworte eingeben"
              class="input input-bordered w-full"
              value={tags()}
              onInput={(e) => setTags(e.currentTarget.value)}
            />
          </div>
        </div>

        <div class="modal-action">
          <button class="btn btn-primary" onClick={() => saveTimesheet()}>
            Speichern
          </button>
          <button class="btn" onClick={() => closeTimeSheetModal()}>
            Schließen
          </button>
        </div>
      </div>
    </dialog>
  );
}
