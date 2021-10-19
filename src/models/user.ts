import mongoose from "mongoose";
import "./bug";
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountCreationDate: {
    type: Date,
    default: Date.now,
  },
  numberOfBugsPosted: {
    type: Number,
    default: 0,
    min: 0,
  },
  assignedBugs: [{ type: Schema.Types.ObjectId, ref: "bug" }],
  bugsSquashed: {
    type: Number,
    default: 0,
    min: 0,
  },
});
export default mongoose.model("user", userSchema);
