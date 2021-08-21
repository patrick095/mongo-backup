import mongoose from 'mongoose';

export interface IUsers {
    name: string;
    user: string;
    password: string;
    email: string;
    observation: string;
    active: boolean;
    admin: boolean;
    seasons: string[];
    expires: Date;
};
export interface IBackup extends mongoose.Document {
    collection_data: any[];
    collection_name: string;
    created: Date;
};

const BackupSchema = new mongoose.Schema<IBackup>({
    collection_data: { 
        type: Array,
        required: true
    },
    collection_name: {
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: new Date()
    }
});

export default BackupSchema