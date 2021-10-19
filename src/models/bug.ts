import { NONAME } from "dns";
import mongoose from "mongoose";
import "./user";

var schema = mongoose.Schema;

var bugSchema = new schema({
  description: { type: String, required: true, minlength: 10 },
  dateCreated: { type: Date, default: Date.now },
  postedBy: {
    user: { type: schema.Types.ObjectId, ref: "user", required: true },
  },
  active: { type: Boolean, default: false },
  assignedTo: {
    type: schema.Types.ObjectId,
    ref: "user",
  },
});
export default mongoose.model("bug", bugSchema);
