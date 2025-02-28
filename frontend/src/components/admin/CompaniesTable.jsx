import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
	const { companies, searchCompanyByText } = useSelector(store => store.company);
	const navigate = useNavigate()
	// creating state for filter company name
	const [filterCompany, setFilterCompany] = useState(companies);

	// filter company logic
	useEffect(() => {
		const filteredCompany = companies.length >= 0 && companies.filter((company) => {
			if (!searchCompanyByText) {
				return true;
			}
			return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
		})
		setFilterCompany(filteredCompany);	// must be filteredCompany, not filterCompany
	}, [companies, searchCompanyByText]);	// if anyone of this changed then useEffect will call


	return (
		<div>
			<Table>
				<TableCaption>A list of your recent registered Companies. </TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Logo</TableHead>
						<TableHead>Company Name</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{
						filterCompany?.map((company) => (
							<TableRow key={company._id}>

								<TableCell className='items-center'>
									<Avatar>
										<AvatarImage src={company.logo} />
									</Avatar>
								</TableCell>
								<TableCell className='capitalize'>{company.name}</TableCell>

								{/* <TableCell className='flex items-center capitalize text-base'>
									<Avatar>
										<AvatarImage src={company.logo} />
									</Avatar>
									<TableCell className='capitalize'>{company.name}</TableCell>
								</TableCell> */}
								
								<TableCell>{company.createdAt.split("T")[0]}</TableCell>
								<TableCell className='text-right cursor-pointer'>
									<Popover>
										<PopoverTrigger><MoreHorizontal /></PopoverTrigger>
										<PopoverContent className='w-32'>
											<div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
												<Edit2 className='w-4' />
												<span>Edit</span>
											</div>
										</PopoverContent>
									</Popover>
								</TableCell>
							</TableRow>
						))
					}
				</TableBody>
			</Table>
		</div>
	)
}

export default CompaniesTable