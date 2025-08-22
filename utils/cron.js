
import cron, { schedule } from "node-cron";

export const scheduleCron = (schedule, task, Options = { scheduled: true, timezone: "UTC"}) => {
    cron.schedule(schedule, task, Options)
}