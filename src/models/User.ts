import bcrypt from 'bcrypt';
import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    comparePassword: (password: any) => Promise<boolean>;
}

const schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});

schema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    return next();
});

schema.methods.comparePassword = async function (
    password: any
): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', schema);
