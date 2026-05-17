import mongoose from "mongoose";
export type UserRole = "admin" | "sales";
export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default User;
//# sourceMappingURL=user.model.d.ts.map