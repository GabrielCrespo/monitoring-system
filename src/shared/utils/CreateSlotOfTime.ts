import moment from "moment";

export default class CreateSlotOfTime {
  public static createSlotOfTime() {
    const timeConfig = {
      start: "8:00",
      end: "23:00",
      next: 30,
    };

    let slotTime = moment(timeConfig.start, "HH:mm");
    let endTime = moment(timeConfig.end, "HH:mm");

    let times = [];

    while (slotTime <= endTime) {
      times.push(slotTime.format("YYYY-MM-DD HH:mm"));
      slotTime = slotTime.add(timeConfig.next, "minutes");
    }

    return times;
  }
}
