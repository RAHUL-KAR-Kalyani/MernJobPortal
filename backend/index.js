// if we add type module in package.json then we can import and export anything like react style

const express = require('express');
require('dotenv').config();
const coockieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./utils/db');
const isAuth = require('./middlewares/isAuth');
const userRouter = require('./routes/userRoutes');
const companyRouter = require('./routes/companyRoutes');
const jobRouter = require('./routes/jobRoutes');
const applicationRouter = require('./routes/applicationRoutes');

const PORT = process.env.PORT || 8080;
const app = express();
const corsOption = {
	origin: 'https://mernjobportal-frontend.onrender.com',
	credentials: true
}


// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(coockieParser());
app.use(cors(corsOption));



// Routes
app.get('/', (req, res) => {
	return res.send('Server is running...........');
});


//	api's

// app.use("api/v1/user",userRouter)
app.use("/auth/user", userRouter)
app.use("/auth/company", companyRouter)
app.use("/auth/job", jobRouter)
app.use("/auth/application", applicationRouter)

// app.use("/auth/user", userRouter)
// app.use("/auth/company", isAuth, companyRouter)
// app.use("/auth/job", isAuth, jobRouter)
// app.use("/auth/application", isAuth, applicationRouter)



// api list 
// http://localhost:8000/auth/register
// http://localhost:8000/auth/login
// http://localhost:8000/auth/profile/update

// Server
app.listen(PORT, () => {
	connectDB()
	console.log(`Server is running at: http://localhost:${PORT}/`);
});