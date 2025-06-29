import { createSignal, onMount } from "solid-js";
import { Kimai } from "../kimai";
import { OptionsIcon } from "../components/Icons";
import { project } from "../lib/timesheet";

export function Projects() {
  const [projects, setProjects] = createSignal([]);

  onMount(async () => {
    const project = await Kimai.getProjects({ ignoreDates: 1 });
    project.sort((a, b) => {
      if (b.end == undefined) {
        return 1;
      }
      if (a.end == undefined) {
        return -1;
      }

      return 0;
    });
    setProjects(project);
  });

  return (
    <ul class="list bg-base-100 rounded-box shadow-md pb-16">
      <For each={projects()}>
        {(project, i) => (
          <>
            <Show
              when={
                project.end != undefined && projects()[i() - 1].end == undefined
              }
            >
              <li class="bg-base-300 p-4 pb-2 text-xs opacity-60 tracking-wide">
                Beendete Projekte
              </li>
            </Show>
            <li class="list-row flex justify-between items-center ">
              <div>
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
  );
}
