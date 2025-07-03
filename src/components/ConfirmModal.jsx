import { createSignal } from "solid-js";

const [message, setMessage] = createSignal("");
let callback = undefined;

export function ConfirmModal() {
  return (
    <dialog id="confirm_modal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 class="text-lg font-bold">Achtung!</h3>
        <p class="py-4">{message}</p>

        <div class="modal-action">
          <button class="btn" onClick={() => closeConfirmModal()}>
            Schließen
          </button>
          <button
            class="btn btn-error"
            onClick={() => {
              callback();
              closeConfirmModal();
            }}
          >
            Bestätigen
          </button>
        </div>
      </div>
    </dialog>
  );
}

export function openConfirmModal(msg, callBack) {
  document.getElementById("confirm_modal").show();
  setMessage(msg);
  callback = callBack;
}

function closeConfirmModal() {
  document.getElementById("confirm_modal").close();
}
