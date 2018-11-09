const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    parent: { type: Schema.Types.ObjectId, ref: 'Parent' },
    content: { type: String, required: true }
},{
    timestamps: true,
    _id: false
});

const SisterModel = new Schema({ 
    username: { type: String, required: true, unique: true },
    hashPassword: { type: String, required: true },
    fullname: { type: String, required: true },
    avatarUrl: { type: String, required: false },
    sex: { type: String, required: true},
    age: { type: Number, required: true },

    address: { type: String, required: false },
    district: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    note: { type: String },

    comment: [CommentSchema]
},{
    timestamps: true
});

module.exports = mongoose.model('Sister', SisterModel); 