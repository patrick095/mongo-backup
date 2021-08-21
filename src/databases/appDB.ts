import mongoose, { Connection, Model } from 'mongoose'

const conn = mongoose.createConnection(`${process.env.DB_APP_URL}`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then((conn) => {
    console.log("app database successfuly connected")
    return conn
})
export default conn