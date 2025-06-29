import { createSignal, onMount } from "solid-js";
import { Kimai } from "../kimai";
import { OptionsIcon } from "../components/Icons";

export function Projects() {
  const [projects, setProjects] = createSignal([]);

  onMount(async () => {
    setProjects(await Kimai.getProjects());
  });

  return (
    <ul class="list bg-base-100 rounded-box shadow-md pb-16">
      <For each={projects()}>
        {(project, _) => (
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
        )}
      </For>
    </ul>
  );
}
