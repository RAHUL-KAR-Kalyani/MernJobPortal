const Company = require("../models/companyModel");
const cloudinary = require('../utils/cloudinary');
const getDataUri = require("../utils/datauri");

const registerCompany = async (req, res) => {
	try {
		const { companyName } = req.body;
		
		if (!companyName) {
			return res.status(400).json({
				message: 'The company name is missing. Please enter it and submit again.',
				success: false
			});
		}

		let company = await Company.findOne({ name: companyName });

		if (company) {
			return res.status(400).json({
				message: "This company is already registered.",
				success: false
			});
		}
		company = await Company.create({
			name: companyName,
			userId: req.id
		})
		return res.status(201).json({
			message: 'Congratulations! Your company has been successfully registered. 🎉',
			company,
			success: true
		});

	} catch (error) {
		console.log(error)
	}
}


const getCompany = async (req, res) => {
	try {
		const userId = req.id; // logged in userid
		const companies = await Company.find({ userId });
		if (!companies) {
			return res.status(404).json({
				message: 'No companies found with the given information.',
				success: false
			});
		}
		return res.status(200).json({
			companies,
			success: true
		});
	} catch (error) {
		console.log(error)
	}
}

// getcompany by id

const getCompanyById = async (req, res) => {
	try {
		const companyId = req.params.id;
		const company = await Company.findById(companyId);

		if (!company) {
			return res.status(404).json({
				message: 'No company found with the given information.',
				success: false
			});
		}
		return res.status(200).json({
			company,
			success: true
		});
	} catch (error) {
		console.log(error)
	}
}


const updateCompany = async (req, res) => {
	try {
		const { name, description, website, location } = req.body;

		// console.log(name, description, website, location);
		
		const file = req.file;

		// cloudinary for logo updating
		const fileUri=getDataUri(file);
		const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
		const logo=cloudResponse.secure_url;	//getting url to access as logo data in db
		
		// cloudinary for logo updating end

		const updateData = { name, description, website, location,logo };

		const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

		if (!company) {
			return res.status(404).json({
				message: 'No company found',
				success: false
			});
		}
		return res.status(200).json({
			message: 'Company information updated successfully.',
			company,
			success: true
		});


	} catch (error) {
		console.log(error)
	}
}


module.exports = { registerCompany, getCompany, getCompanyById, updateCompany };