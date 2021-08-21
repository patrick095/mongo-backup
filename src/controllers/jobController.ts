import { CronJob } from 'cron'
import { Connection, Model } from 'mongoose'
import DoBackup from './backupController'


function createNewJob(hour: number, minute: number, models: any[], conn: Connection){
    console.log(`Backup agendado para executar todos os dias às ${hour}:${minute}`)
    const job = new CronJob(`0 ${minute} ${hour} * * *`, async () => {
        console.log('iniciando backup - '+new Date())
    DoBackup(models, conn)
    },
    null,
    true,
    'America/Recife'
    )
    return job
}
export default createNewJob