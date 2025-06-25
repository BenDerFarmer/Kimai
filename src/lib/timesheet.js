import { checkRecording } from "../components/StartStopButton";
import { Kimai } from "../kimai";
import { refrechTimeSheets } from "../TimeSheets";
import { createSignal } from "solid-js";

export const timeSheetModalID = "timesheet_modal";

export const [beginDate, setBeginDate] = createSignal(null);
export const [duration, setDuration] = createSignal(null);
export const [endTime, setEndTime] = createSignal(null);
export const [customer, setCustomer] = createSignal(null);
export const [project, setProject] = createSignal(null);
export const [activity, setActivity] = createSignal(null);
export const [desc, setDesc] = createSignal(null);
export const [tags, setTags] = createSignal(null);
export const [id, setId] = createSignal(null);

export const [projects, setProjects] = createSignal([]);

export async function saveTimesheet() {
  const options = {
    description: desc(),
  };

  if (beginDate() != null) {
    options["begin"] = beginDate();
  }

  if (endTime() != null) {
    const time = endTime().split(":");
    const date = beginDate();

    const newDate = new Date(date != "" ? date : Date.now());
    newDate.setHours(time[0], time[1]);

    options["end"] = newDate;
  }

  if (id()) {
    await Kimai.updateTimeSheet(id(), project(), activity(), options);
  } else {
    await Kimai.start(project(), activity(), options);
  }

  refrechTimeSheets();
  closeTimeSheetModal();
  resetModal();
}

export async function openTimeSheetModal(options) {
  document.getElementById(timeSheetModalID).showModal();

  if (options != undefined) {
    if (options["begin"] != null) {
      setBeginDate(options["begin"].substring(0, 16));
    }
    if (options["end"] != null) {
      setEndTime(options["end"].substring(11, 16));
    }
    if (options["desc"] != null) {
      setDesc(options["desc"]);
    }
    if (options["id"] != null) {
      setId(options["id"]);
    }
    if (options["activity"] != null) {
      setActivity(options["activity"]);
    }
    if (options["project"] != null) {
      const customer = (await Kimai.cache.getProjects())[options["project"]]
        .customer;
      setCustomer(customer);

      setProjects(
        await Kimai.getProjects({
          customer: customer,
        }),
      );

      setProject(options["project"]);
    }
  }
}

export function closeTimeSheetModal() {
  checkRecording();
  resetModal();
  document.getElementById(timeSheetModalID).close("");
}

export function resetModal() {
  setBeginDate(null);
  setDuration(null);
  setEndTime(null);
  setProject(null);
  setActivity(null);
  setDesc(null);
  setTags(null);
  setId(null);
  setCustomer(null);
}
