const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    parent: { type: Schema.Types.ObjectId, ref: "Parent" },
    content: { type: String, required: true }
  },
  {
    timestamps: true,
    _id: false
  }
);

const SisterModel = new Schema(
  {
    phoneNumber: { type: String, required: true, unique: true },
    hashPassword: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    sex: { type: String, required: true },
    age: { type: Number, required: true },

    // avatar: { type: Buffer, required: false },
    // contentType: { type: String, required: true },

    hashAvatar: { type: String, required: true },

    address: { type: String, required: false },
    district: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, unique: true },
    note: { type: String },


    comment: [CommentSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Sister", SisterModel);
