import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminJobSetup from './components/admin/AdminJobSetup'

const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/signup',
		element: <Signup />
	},
	{
		path: '/jobs',
		element: <Jobs />
	},
	{
		path: '/job/description/:id',
		element: <JobDescription />
	},
	{
		path: '/browse',
		element: <Browse />
	},
	{
		path: '/profile',
		element: <Profile />
	},

	// admin start

	{
		path: '/admin/companies',
		element: <ProtectedRoute><Companies /></ProtectedRoute>
	},
	{
		path: '/admin/companies/create',
		element: <ProtectedRoute><CreateCompany /></ProtectedRoute>
	},
	{
		path: '/admin/companies/:id',
		element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
	},
	{
		path: '/admin/jobs',
		element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
	},
	{
		path: '/admin/jobs/:id',
		element: <ProtectedRoute><AdminJobSetup /></ProtectedRoute>
	},
	{
		path: '/admin/jobs/create',
		element: <ProtectedRoute><PostJob /></ProtectedRoute>
	},
	{
		path: '/admin/jobs/:id/applicants',
		element: <ProtectedRoute><Applicants /></ProtectedRoute>
	},
])

function App() {

	return (
		<div>
			<RouterProvider router={appRouter} />
			{/* <h1 className='bg-red-500'>hi</h1> */}

		</div>
	)
}

export default App
