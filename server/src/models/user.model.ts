import mongoose, {
  Schema,
} from "mongoose";

export type UserRole =
  | "admin"
  | "sales";

export interface IUser
  extends mongoose.Document {
  name: string;

  email: string;

  password: string;

  role: UserRole;
}

const userSchema =
  new Schema<IUser>(
    {
      name: {
        type: String,

        required: true,
      },

      email: {
        type: String,

        required: true,

        unique: true,
      },

      password: {
        type: String,

        required: true,
      },

      role: {
        type: String,

        enum: [
          "admin",
          "sales",
        ],

        default: "sales",
      },
    },

    {
      timestamps: true,
    }
  );

const User = mongoose.model<IUser>(
  "User",
  userSchema
);

export default User;