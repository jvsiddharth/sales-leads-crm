import mongoose, { Schema, } from "mongoose";
const leadSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [
            "new",
            "contacted",
            "qualified",
            "lost",
        ],
        default: "new",
    },
    source: {
        type: String,
        enum: [
            "website",
            "instagram",
            "referral",
        ],
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
const Lead = mongoose.model("Lead", leadSchema);
export default Lead;
//# sourceMappingURL=lead.model.js.map