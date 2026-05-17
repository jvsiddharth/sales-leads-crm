import mongoose from "mongoose";
export type LeadStatus = "new" | "contacted" | "qualified" | "lost";
export type LeadSource = "website" | "instagram" | "referral";
export interface ILead extends mongoose.Document {
    name: string;
    email: string;
    status: LeadStatus;
    source: LeadSource;
    createdBy: mongoose.Types.ObjectId;
}
declare const Lead: mongoose.Model<ILead, {}, {}, {}, mongoose.Document<unknown, {}, ILead, {}, mongoose.DefaultSchemaOptions> & ILead & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILead>;
export default Lead;
//# sourceMappingURL=lead.model.d.ts.map