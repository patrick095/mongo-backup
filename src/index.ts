require('dotenv').config()
import createJob from "./controllers/jobController"
import conn from "./databases/appDB"


const appDBCreateConnection = conn
appDBCreateConnection.then(async conn => {
    let collections = await conn.db.collections()
    let collectionsListNames: string[] = []
    
    collections.map(collection => collectionsListNames.push(collection.namespace.split('.')[1]))
    
    createJob(parseInt(process.env.CRON_HOUR), parseInt(process.env.CRON_MIN), collectionsListNames, conn)
})