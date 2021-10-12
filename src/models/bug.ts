import mongoose from "mongoose";

var schema = mongoose.Schema;

var bugSchema = new schema({
  description: { type: String, required: true, minlength: 10 },
  dateCreated: { type: Date, default: Date.now },
  postedBy: { type: String, required: true },
  fixed: { type: Boolean, default: false },
});
export default mongoose.model("bug", bugSchema);
