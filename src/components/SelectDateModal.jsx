import { createSignal } from "solid-js";

const [title, setTitle] = createSignal("");
const [message, setMessage] = createSignal("");

const [date, setDate] = createSignal();

let callback = undefined;

export function SelectDateModal() {
  return (
    <dialog id="date_modal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 class="text-lg font-bold">{title}</h3>

        <div>
          <p class="py-4">{message}</p>

          <input
            type="date"
            class="input input-bordered w-full"
            value={date()}
            onInput={(e) => setDate(e.currentTarget.value)}
          />
        </div>

        <div class="modal-action">
          <button class="btn" onClick={() => closeSelectDateModal()}>
            Schließen
          </button>
          <button
            class="btn btn-success"
            onClick={() => {
              callback(date());
              closeSelectDateModal();
            }}
          >
            Bestätigen
          </button>
        </div>
      </div>
    </dialog>
  );
}

export function openSelectDateModal(title, msg, callBack) {
  document.getElementById("date_modal").show();
  setTitle(title);
  setMessage(msg);
  callback = callBack;
}

function closeSelectDateModal() {
  document.getElementById("date_modal").close();
}
