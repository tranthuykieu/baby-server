const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    sister: { type: Schema.Types.ObjectId, ref: 'Sister' },
    content: { type: String, required: true }
},{
    timestamps: true,
    _id: false
});

const ParentSchema = new Schema({
    phoneNumber: { type: Number, required: true, unique: true },
    hashPassword: { type: String, required: true },
    fullname: { type: String, required: true },
    address: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },

    // avatar: { type: Buffer, required: true },
    // contentType: { type: String, required: true },

    avatar: { type: String, required: true },

    sex: { type: String },
    age: { type: Number },
    email: { type: String, unique: true },
    
    babyGender: { type: String },
    babyAge: { type: Number, required: String },
    // babyPicture: { type: String, default: "https://www.mvhsoracle.com/wp-content/uploads/2018/08/default-avatar.jpg"},
    note: { type: String },

    comment: [CommentSchema]
},{
    timestamps: true
});

module.exports = mongoose.model('Parent', ParentSchema);