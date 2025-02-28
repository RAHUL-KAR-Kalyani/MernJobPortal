const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		require: true
	},
	requirements: [{
		type: String
	}],
	salary: {
		type: Number,
		require: true
	},
	experienceLevel: {
		type: Number,
		required: true,
	},
	location: {
		type: String,
		required: true
	},
	jobType: {
		type: String,
		required: true
	},
	position: {
		type: Number,
		required: true
	},
	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company',
		required: true
	},
	created_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	applications: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Application'
		}
	]
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;