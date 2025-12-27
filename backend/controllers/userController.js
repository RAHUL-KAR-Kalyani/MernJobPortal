// for register, login, logout, update for user info
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../models/userModel");
const getDataUri = require('../utils/datauri');
const cloudinary = require('../utils/cloudinary');


// register controler
const registerController = async (req, res) => {
	try {
		const { fullname, email, phoneNumber, password, role } = req.body;

		// check for missing data or not 👇
		console.log(fullname, email, phoneNumber, password, role)

		if (!fullname || !email || !phoneNumber || !password || !role) {
			return res.status(400).json({
				message: `Something seems to be missing. Try again after filling it out.`,
				success: false
			});
		}

		const file=req.file;
		const fileUri=getDataUri(file);
		const cloudResponse=await cloudinary.uploader.upload(fileUri.content);


		// check email,phoneNumber is registered or not 👇

		// const user_detais = await User.findOne({ email,phoneNumber });
		// if (user_detais) {
		// 	return res.status(400).json({
		// 		message: 'This email and phone number are both previously registered. Please use another one',
		// 		success: false,
		// 	})
		// }


		const email_id = await User.findOne({ email });
		if (email_id) {
			return res.status(400).json({
				message: 'This email is already registered. Please use a different one.',
				success: false,
			})
		}

		// const contact = await User.findOne({ phoneNumber });
		// if (contact) {
		// 	return res.status(400).json({
		// 		message: 'This Phone Number is already registered. Please use another one.',
		// 		success: false,
		// 	})
		// }


		// hashing/encrypt password 👇
		const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT))

		await User.create({
			fullname,
			email,
			phoneNumber,
			password: hashedPassword,
			role,
			profile:{
				profilePhoto:cloudResponse.secure_url,
			}
		})

		return res.status(201).json({
			message: "Awesome! Your account is all set up. Let's get started! 😊",
			success: true
		})

	} catch (error) {
		console.log(error)
	}
}

// login controler
const loginController = async (req, res) => {
	try {
		const { email, password, role } = req.body;

		// check for missing data or not 👇

		if (!email || !password || !role) {
			return res.status(400).json({
				message: 'Required information is missing. Please complete all necessary fields.',
				success: false
			});
		}

		// check user info is correct or not 👇

		let user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({
				message: 'Incorrect email or password',
				success: false,
			});
		}

		// check user password is correct or not 👇

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return res.status(400).json({
				message: 'Incorrect password. Please verify your credentials and try again.',
				success: false,
			});
		}

		// check role is correct or not 👇

		if (role !== user.role) {
			return res.status(400).json({
				message: "Account role mismatch. Please verify your account and role.",
				success: false,
			});
		}

		const tokenData = {
			userId: user._id
		}
		const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

		user = {
			_id: user._id,
			fullname: user.fullname,
			email: user.email,
			phoneNumber: user.phoneNumber,
			role: user.role,
			profile: user.profile
		}

		// return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
		// 	message: `Welcome back ${user.fullname}! Let's get started. 😊`,
		// 	user,
		// 	success: true
		// });
		return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' }).json({
			message: `Welcome back ${user.fullname}! Let's get started. 😊`,
			user,
			success: true
		});
		

	} catch (error) {
		console.log(error);
	}
}

// const logoutController = async (req, res) => {
// 	try {
//         const { email, password, role } = req.body;

//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         };
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             })
//         }
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             })
//         };
//         // check role is correct or not
//         if (role !== user.role) {
//             return res.status(400).json({
//                 message: "Account doesn't exist with current role.",
//                 success: false
//             })
//         };

//         const tokenData = {
//             userId: user._id
//         }
//         const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }

//         return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
//             message: `Welcome back ${user.fullname}`,
//             user,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

// logout controler


const logoutController = async (req, res) => {
	try {
		return res.status(200).cookie("token", "", { maxAge: 0 }).json({
			message: "You have successfully logged out. See you next time! 👋",
			success: true
		})
	} catch (error) {
		console.log(error)
	}
}

// updateProfile controler
const updateController = async (req, res) => {
	try {
		const { fullname, email, phoneNumber, bio, skills } = req.body;
		// console.log(fullname, email, phoneNumber, bio, skills)

		const file = req.file;
		// cloudinary for file upload(i.e. pdf, image, video)👇
		const fileUri = getDataUri(file);
		// const cloudResponse = await cloudinary_js_config.uploader.upload(fileUri.content);
		const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

		let skillsArray;
		if (skills) {
			skillsArray = skills.split(",");
		}
		const userId = req.id;	// middleware authentication
		let user = await User.findById(userId);

		if (!user) {
			return res.status(400).json({
				message: "Oops! We couldn't find the user. Please check your details and try again.",
				success: false
			})
		}

		// updating data

		if (fullname) user.fullname = fullname;
		if (email) user.email = email;
		if (phoneNumber) user.phoneNumber = phoneNumber;
		if (bio) user.profile.bio = bio;
		if (skills) user.profile.skills = skillsArray;

		// resume wiil come here.........
		if (cloudResponse) {
			user.profile.resume = cloudResponse.secure_url;			//save the cloudinary url
			user.profile.resumeOriginalName = file.originalname;		//save the original file
		}

		await user.save()	//save to database

		user = {
			_id: user._id,
			fullname: user.fullname,
			email: user.email,
			phoneNumber: user.phoneNumber,
			role: user.role,
			profile: user.profile
		}

		return res.status(200).json({
			message: "Your profile has been successfully updated! 🎉",
			user,
			success: true
		})

	} catch (error) {
		console.log(error);
	}
}


module.exports = { registerController, loginController, updateController, logoutController };

