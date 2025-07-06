import { createSignal, onMount } from "solid-js";
import { Kimai } from "../kimai";
import { OptionsIcon, SearchIcon } from "../components/Icons";
import {
  loadProject,
  openProjectModal,
  ProjectModal,
} from "../components/ProjectModal";

const sortEndDate = (a, b) => {
  if (b.end == undefined) {
    return 1;
  }
  if (a.end == undefined) {
    return -1;
  }

  return 0;
};

export function Projects() {
  const [projects, setProjects] = createSignal([]);

  onMount(async () => {
    const project = await Kimai.getProjects({ ignoreDates: 1 });
    project.sort(sortEndDate);
    setProjects(project);
  });

  return (
    <>
      <ProjectModal />
      <ul class="list bg-base-100 rounded-box shadow-md">
        <li class="bg-base-300 p-4 pb-2 text-xs opacity-85 tracking-wide flex justify-between">
          <div class="flex w-full">
            <label class="input">
              <SearchIcon />
              <input
                onChange={async (e) =>
                  setProjects(
                    (
                      await Kimai.getProjects({
                        term: e.currentTarget.value,
                        ignoreDates: 1,
                      })
                    ).sort(sortEndDate),
                  )
                }
                type="search"
                class="grow"
                placeholder="Suchen"
              />
            </label>
          </div>
          <button
            onClick={() => {
              openProjectModal();
            }}
            class="btn btn-success"
          >
            +
          </button>
        </li>
        <For each={projects()}>
          {(project, i) => (
            <>
              <Show
                when={
                  project.end != undefined &&
                  projects()[i() - 1] != undefined &&
                  projects()[i() - 1].end == undefined
                }
              >
                <li class="bg-base-300 p-4 pb-2 text-xs  tracking-wide">
                  Beendete Projekte
                </li>
              </Show>
              <li class="list-row flex justify-between items-center ">
                <div
                  onClick={() => {
                    loadProject(project.id);
                    openProjectModal();
                  }}
                >
                  <div> {project.name}</div>
                  <div class="text-xs uppercase font-semibold opacity-60">
                    {project.parentTitle}
                  </div>
                </div>
                <div class="flex">
                  <button class="btn btn-square btn-ghost">
                    <OptionsIcon />
                  </button>
                </div>
              </li>
            </>
          )}
        </For>
      </ul>
    </>
  );
}
