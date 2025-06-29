import { createSignal, onMount } from "solid-js";
import { Kimai } from "../kimai";
import { OptionsIcon } from "../components/Icons";

export function Activities() {
  const [activities, setActivities] = createSignal([]);

  onMount(async () => {
    setActivities(await Kimai.getTasks());
  });

  return (
    <ul class="list bg-base-100 rounded-box shadow-md pb-16">
      <For each={activities()}>
        {(project, _) => (
          <li class="list-row flex justify-between items-center">
            {project.name}
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
