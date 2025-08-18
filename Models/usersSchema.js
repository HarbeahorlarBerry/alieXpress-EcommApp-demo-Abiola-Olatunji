import { Schema, model } from "mongoose";

const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  gmail: {
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
      "user", "admin", "altimateAdmin"  // role system
    ],
    default: "user", 
  },
  profile: {
        country: {
            type: String,
            // required: true,
        },
        Number: {
            type: Number,
            // required: true
        },
        Street: {
            type: String,
            // required: true
        },
        Bio: {
            type: String,
            // required: true
        }   
    },
    otp: String,
    otpExpires: Date,
    isVerified: { type: Boolean, default: false },
    lastOtpSentAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, { timestamps: true }); // Corrected timestamps

const User = model("User", usersSchema); // Corrected model creation

export default User;
