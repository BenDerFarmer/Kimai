import { createSignal } from "solid-js";
import { Kimai } from "../kimai";
import { openTimeSheetModal } from "./TimeSheetModal";

export function StartStopButton() {
  const [isRecording, setIsRecording] = createSignal(false);

  return (
    <button
      onClick={() => {
        if (isRecording()) {
        } else {
          openTimeSheetModal();
        }

        setIsRecording(!isRecording());
      }}
      class={"btn font-bold " + (isRecording() ? "btn-error" : "btn-success")}
    >
      {isRecording() ? <StopIcon /> : <StartIcon />}
    </button>
  );
}

function StopIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}

function StartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  );
}
