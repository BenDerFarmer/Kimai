import { createSignal, onMount } from "solid-js";
import { Kimai } from "../kimai";

const [name, setName] = createSignal(null);
const [beginDate, setBeginDate] = createSignal(null);
const [endDate, setEndDate] = createSignal(null);
const [customer, setCustomer] = createSignal(null);
const [desc, setDesc] = createSignal(null);
const [id, setId] = createSignal(null);

export function openProjectModal() {
  document.getElementById("project_modal").show();
}

export function closeProjectModal() {
  document.getElementById("project_modal").close();
  resetModal();
}

export function resetModal() {
  setName(null);
  setBeginDate(null);
  setEndDate(null);
  setCustomer(null);
  setDesc(null);
  setId(null);
}

export async function loadProject(id) {
  const project = await Kimai.getProject(id);
  setName(project.name);
  setBeginDate(project.start != null ? project.start.split("T")[0] : null);
  setEndDate(project.end != null ? project.end.split("T")[0] : null);
  setCustomer(project.customer);
  setDesc(project.comment);
  setId(project.id);
}

export async function saveProject() {
  const options = {
    comment: desc(),
  };

  if (beginDate() != null) {
    options["start"] = beginDate() + "T00:00:00Z";
  }

  if (endDate() != null) {
    options["end"] = endDate() + "T00:00:00Z";
  }

  if (id()) {
    await Kimai.updateProject(id(), name(), customer(), options);
  } else {
    await Kimai.createProject(name(), customer(), options);
  }

  closeProjectModal();
}

export function ProjectModal() {
  const [customers, setCustomers] = createSignal([]);

  onMount(async () => {
    setCustomers(await Kimai.getCustomers());
  });

  return (
    <dialog id="project_modal" class="modal">
      <div class="modal-box max-w-lg">
        <h3 class="font-bold text-lg mb-4">Projekt erstellen</h3>

        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              value={name()}
              onInput={(e) => setName(e.currentTarget.value)}
              type="text"
              placeholder=""
              class="input w-full"
            />
          </div>

          <div>
            <label class="label">
              <span class="label-text">Von</span>
            </label>
            <input
              type="date"
              class="input input-bordered w-full"
              value={beginDate()}
              onInput={(e) => setBeginDate(e.currentTarget.value)}
            />
          </div>

          <div>
            <label class="label">
              <span class="label-text">Ende</span>
            </label>

            <input
              type="date"
              class="input input-bordered w-full"
              value={endDate()}
              onInput={(e) => setEndDate(e.currentTarget.value)}
            />
          </div>

          <div class="col-span-2">
            <label class="label">
              <span class="label-text">Kunde</span>
            </label>
            <select
              class="select select-bordered w-full"
              id="customer"
              value={customer()}
              onChange={(e) => setCustomer(e.currentTarget.value)}
            >
              <option value="">– wähle –</option>

              <For each={customers()}>
                {(cust, _) => <option value={cust.id}>{cust.name}</option>}
              </For>
            </select>
          </div>

          <div class="col-span-2">
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
        </div>

        <div class="modal-action">
          <button class="btn btn-primary" onClick={() => saveProject()}>
            Speichern
          </button>
          <button class="btn" onClick={() => closeProjectModal()}>
            Schließen
          </button>
        </div>
      </div>
    </dialog>
  );
}
