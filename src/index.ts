require('dotenv').config()
import createJob from "./controllers/jobController"

createJob(parseInt(process.env.CRON_HOUR), parseInt(process.env.CRON_MIN))
