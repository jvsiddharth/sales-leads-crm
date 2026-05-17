import mongoose, {
  Schema,
} from "mongoose";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "lost";

export type LeadSource =
  | "website"
  | "instagram"
  | "referral";

export interface ILead
  extends mongoose.Document {
  name: string;

  email: string;

  status: LeadStatus;

  source: LeadSource;

  createdBy:
    mongoose.Types.ObjectId;
}

const leadSchema =
  new Schema<ILead>(
    {
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
        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },
    },

    {
      timestamps: true,
    }
  );

const Lead = mongoose.model<ILead>(
  "Lead",
  leadSchema
);

export default Lead;