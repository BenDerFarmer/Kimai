import { createSignal, onMount } from "solid-js";
import { Kimai } from "../kimai";

export function Todo() {
  const [todos, setTodos] = createSignal([]);
  const [projects, setProjects] = createSignal([]);
  const [project, setProject] = createSignal(null);

  onMount(async () => {
    setProjects(await Kimai.getProjects());
    setProject(localStorage.getItem("todo_select"));
    loadTodos(project());
  });

  const loadTodos = (id) => {
    setTodos(JSON.parse(localStorage.getItem("todo_" + id)) ?? []);
  };

  const saveTodos = () => {
    localStorage.setItem("todo_" + project(), JSON.stringify(todos()));
  };

  const selectProject = (id) => {
    setProject(id);
    loadTodos(id);
    localStorage.setItem("todo_select", id);
  };

  return (
    <div class="card card-border border-base-300 bg-base-100 w-96">
      <div class="card-body">
        <div class="flex gap-4 mb-6">
          <h2 class="card-title">TODO's</h2>

          <select
            class="select select-bordered"
            id="project"
            value={project()}
            onChange={(e) => selectProject(e.currentTarget.value)}
          >
            <option value="">– wähle –</option>

            <For each={projects()}>
              {(proj, _) => <option value={proj.id}>{proj.name}</option>}
            </For>
          </select>
        </div>

        <ul class="mb-6">
          <For each={todos()} fallback={<h2>Füge Todo's hinzu ...</h2>}>
            {(todo) => (
              <TodoListItem
                todo={todo}
                setTodos={setTodos}
                saveTodos={saveTodos}
              />
            )}
          </For>
        </ul>

        <AddTodoForm setTodos={setTodos} saveTodos={saveTodos} />
      </div>
    </div>
  );
}

function AddTodoForm(props) {
  const [newTodo, setNewTodo] = createSignal("");

  return (
    <form class="join">
      <input
        value={newTodo()}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
        class="input join-item"
      />
      <button
        class="btn join-item btn-success"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          props.setTodos((todos) => {
            return [...todos, { text: newTodo(), complete: false }];
          });
          props.saveTodos();
          setNewTodo("");
        }}
      >
        +
      </button>
    </form>
  );
}

function TodoListItem(props) {
  return (
    <li class={"text-xl flex gap-2 items-center"}>
      <input
        type="checkbox"
        class="checkbox"
        checked={props.todo.complete}
        onChange={() => {
          props.setTodos((todos) => {
            const newTodos = todos.map((todo) =>
              props.todo === todo
                ? { ...todo, complete: !todo.complete }
                : todo,
            );
            return newTodos;
          });
          props.saveTodos();
        }}
      />
      <label>{props.todo.text}</label>
    </li>
  );
}
