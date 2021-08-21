import { Connection} from 'mongoose'
import Backup from '../databases/backupDB'

async function collectionToBackup(name: string, conn: Connection){
    let data: {
        collection_data?: any,
        collection_name?: string,
        created?: Date
    } = {}
    const modelData = await findData()
    async function findData(){
        return new Promise((resolve)=> {
            conn.db.collection(name, async (err, Users) => {
               Users.find().toArray((err, data)=> resolve(data))
           })
        })
    }
    data['collection_data'] = modelData
    data['collection_name'] = name
    data['created'] = new Date()
    return data
}

async function DoBackup(models: string[], conn: Connection){
models.map(async model => {
    return await new Promise(async resolve => {
        let dataToBackup = await collectionToBackup(model, conn)
        let backup = await Backup
        let backupColection = new backup(dataToBackup)
        backupColection.save((err, result) => {
            if (err) throw err
            console.log('backup da collection "'+model+'" realizado com sucesso! - '+new Date())
            resolve(result)
        })
    })
})
}
export default DoBackup