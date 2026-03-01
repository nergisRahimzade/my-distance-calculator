import { DateTime } from "luxon";

export function getLocalTime(timeZone: string) {
  if (!timeZone) return null;

  return DateTime.now()
    .setZone(timeZone)
    .toFormat("EEEE, MMM d yyyy, HH:mm");
}