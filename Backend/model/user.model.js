import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

const user = mongoose.model("users", userSchema);
export default user;
