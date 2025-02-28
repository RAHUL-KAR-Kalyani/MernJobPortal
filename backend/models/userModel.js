const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        require: true
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },   // Url to resume file
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },   // generate relation b/w company table and user table
        profilePhoto: { type: String, default: "" },

    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;