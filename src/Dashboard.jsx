import { Dock } from "./components/Dock";
import { Bar } from "./components/Bar";
import { TimeSheetModal } from "./components/TimeSheetModal";

export default function Dashboard() {
  return (
    <div>
      <Bar />
      <TimeSheetModal />
      <Dock />
    </div>
  );
}
