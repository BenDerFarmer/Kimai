import { createSignal } from "solid-js";

const [message, setMessage] = createSignal("");

export function ErrorModal() {
  return (
    <dialog id="error_modal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 class="text-lg font-bold text-error">Fehler!</h3>
        <p class="py-4 ">{message()}</p>
      </div>
    </dialog>
  );
}

export function openErrorModal(msg) {
  document.getElementById("error_modal").show();
  setMessage(msg);
}
