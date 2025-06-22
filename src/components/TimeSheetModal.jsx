const timeSheetModalID = "timesheet_modal";
import { createSignal, onMount } from "solid-js";
import { Kimai } from "../kimai";
import { checkRecording } from "./StartStopButton";
import { refrechTimeSheets } from "../TimeSheets";

export const [fromDate, setFromDate] = createSignal("");
export const [duration, setDuration] = createSignal("");
export const [endTime, setEndTime] = createSignal("");
export const [project, setProject] = createSignal("");
export const [activity, setActivity] = createSignal("");
export const [desc, setDesc] = createSignal("");
export const [tags, setTags] = createSignal("");
export const [id, setId] = createSignal(undefined);

export function openTimeSheetModal() {
  document.getElementById(timeSheetModalID).showModal();
}

export function closeTimeSheetModal() {
  checkRecording();
  resetModal();
  document.getElementById(timeSheetModalID).close("");
}

export function resetModal() {
  setFromDate("");
  setDuration("");
  setEndTime("");
  console.log(endTime());
  setProject("");
  setActivity("");
  setDesc("");
  setTags("");
  setId("");
}

export function TimeSheetModal() {
  const [activitys, setActivitys] = createSignal([]);
  const [projects, setProjects] = createSignal([]);
  const [customers, setCustomers] = createSignal([]);

  onMount(async () => {
    setActivitys(await Kimai.getTasks());
    setCustomers(await Kimai.getCustomers());
  });

  const selectCustomer = async (e) => {
    const id = e.currentTarget.value;

    setProjects(
      await Kimai.getProjects({
        customer: id,
      }),
    );
  };

  const selectFromDate = (e) => {
    setFromDate(e.currentTarget.value);

    setEndTime("");
  };

  const selectEndTime = (e) => {
    if (e.currentTarget.value == "") return;

    const time = e.currentTarget.value.split(":");
    const date = fromDate();

    const newDate = new Date(date != "" ? date : Date.now());
    newDate.setHours(time[0], time[1]);
  };

  const saveTimesheet = async () => {
    const options = {
      description: desc(),
    };

    if (fromDate() != "") {
      options["begin"] = fromDate();
    }

    if (endTime() != "") {
      options["end"] = endTime();
    }

    await Kimai.start(project(), activity(), options);
    refrechTimeSheets();
    closeTimeSheetModal();
    resetModal();
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
              value={fromDate()}
              onInput={(e) => selectFromDate(e)}
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Dauer</span>
            </label>
            <input
              type="text"
              placeholder="0:00"
              class="input input-bordered w-full"
              value={duration()}
              onInput={(e) => setDuration(e.currentTarget.value)}
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Ende</span>
            </label>

            <input
              type="time"
              class="input input-bordered w-full"
              value={endTime()}
              onInput={(e) => selectEndTime(e)}
            />
          </div>

          <div class="form-control col-span-2">
            <label class="label">
              <span class="label-text">Kunde</span>
            </label>
            <select
              class="select select-bordered w-full"
              id="customer"
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
              rows={3}
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
