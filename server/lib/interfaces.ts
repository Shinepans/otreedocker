import {Document} from 'mongoose'

interface IDocument extends Document {
    updateAt: number;
    createAt: number;
}

export interface UserDoc extends IDocument {
    phone: string;
    mobile: string;
    name: string;
    password: string;
    gender: string;
    comparePassword: (
        password: string,
        cb: (err: Error, isMatch: boolean) => any
    ) => any;
}

export interface UserOTreeRec extends IDocument {
    user: string & UserDoc;
    host: string;
    port: number;
    uniKey: string;
}
