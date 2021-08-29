require('dotenv').config()
import * as fs from 'fs/promises'
import shell from 'shelljs'
import rootDir from '../../config'

export default async function dbRestore(name?: string) {
    console.log('start restore')
    const backupUrl = process.env.DB_BACKUP_URL
    let backupName: string
    if (!name) {
        let listOfBackups = await fs.readdir(rootDir+'/backup')
        backupName = [...listOfBackups].pop()
    }
    else {
        let listOfBackups = await fs.readdir(rootDir+'/backup')
        if (!listOfBackups.find(el => el === name )) throw new Error("backup not found")
    }
    const cmd = `mongorestore --uri="${backupUrl}" ${rootDir+"/backup/"+backupName}`
    const child = shell.exec(cmd, {async: true})
    child.stdout.on('data', data => console.log(data))
    child.stdout.on('end', () =>{
        console.log('restauração finalizada com sucesso!')
    })
}