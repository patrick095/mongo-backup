require('dotenv').config()
import * as fsP from 'fs/promises'
import * as fs from 'fs'
import _ from 'lodash'
import shell from 'shelljs'
import rootDir from '../../config'

var dbOptions =  {
    uri: process.env.DB_APP_URL,
    removeOldBackup: true,
    keepLastDaysBackup: 2,
    BackupPath: rootDir+'/backup/'
};

async function installMongodump(){
    console.log('installing mongodump')
    new Promise(resolve => {
        const Child = shell.exec('sudo apt update', {async: true})
        Child.stdout.on('end', () =>{
            const child = shell.exec('sudo apt install mongo-tools', {async: true})
            child.stdout.on('end', resolve)
        })
    })
}

export default async function dbBackUp(): Promise<string> {
    const res: Promise<string> = new Promise(async resolve => {
        console.log('start backup')
        let beforeDate: Date, oldBackupDir: string, oldBackupPath: string
        const currentDate = new Date();
        const newBackupDir = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
        const newBackupPath = dbOptions.BackupPath + 'mongodump-' + newBackupDir
        if (dbOptions.removeOldBackup == true) {
            beforeDate = _.clone(currentDate);
            beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup)
            oldBackupDir = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate()
            oldBackupPath = dbOptions.BackupPath + 'mongodump-' + oldBackupDir
        }
        if (!shell.which('mongodump')) await installMongodump()
        if (!fs.existsSync(newBackupPath)) await fsP.mkdir(newBackupPath)
        const cmd = `mongodump --uri="${dbOptions.uri}" --out="${newBackupPath}"`
        const child = shell.exec(cmd, {async: true})
        child.stdout.on('data', data => console.log(data))
        child.stdout.on('end', () =>{
            console.log('backup finalizado com sucesso!')
            if (dbOptions.removeOldBackup == true) {
                if (fs.existsSync(oldBackupPath)) {
                    shell.exec("rm -rf " + oldBackupPath, function (err) { })
                }
            }
            return resolve('done')
        })
    })
    return res
}