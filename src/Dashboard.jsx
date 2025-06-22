import { Dock } from "./components/Dock";
import { Bar } from "./components/Bar";
import { TimeSheetModal } from "./components/TimeSheetModal";
import { TimeSheets } from "./TimeSheets";

export default function Dashboard() {
  return (
    <div>
      <Bar />
      <TimeSheetModal />
      <TimeSheets />
      <Dock />
    </div>
  );
}
