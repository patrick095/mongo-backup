import mongoose, { Connection, Model } from 'mongoose'
import BackupSchema from '../model/Backup'

const conn = mongoose.createConnection(`${process.env.DB_BACKUP_URL}`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then((conn) => {
    console.log("backup database successfuly connected")
    const model = conn.model('Backup', BackupSchema)
    return model
})
export default conn