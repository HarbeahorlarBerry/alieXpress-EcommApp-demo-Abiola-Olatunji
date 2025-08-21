<<<<<<< HEAD
import cron, { schedule } from "node-cron";

export const scheduleCron = (schedule, task, Options = { scheduled: true, timezone: "UTC"}) => {
    cron.schedule(schedule, task, Options)
=======
import cron, { schedule } from "node-cron";

export const scheduleCron = (schedule, task, Options = { scheduled: true, timezone: "UTC"}) => {
    cron.schedule(schedule, task, Options)
>>>>>>> 0d63b00672bda2fa831c980a89e1892c9c48ad22
}