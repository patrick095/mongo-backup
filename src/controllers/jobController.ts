import { CronJob } from 'cron'
import dbBackUp from './dumpBackupController'
import dbRestore from './dumpRestoreController'


function createNewJob(hour: number, minute: number){
    console.log(`Backup agendado para executar todos os dias às ${hour}:${minute}`)
    const job = new CronJob(`0 ${minute} ${hour} * * *`, async () => {
        await dbBackUp()
        await dbRestore()
    },
    null,
    true,
    'America/Recife'
    )
    return job
}
export default createNewJob