import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption className= 'text-[#a294c5]'>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className= 'text-[#a294c5] font-bold'>Logo</TableHead>
                        <TableHead className= 'text-[#a294c5] font-bold'>Name</TableHead>
                        <TableHead className= 'text-[#a294c5] font-bold'>Date</TableHead>
                        <TableHead className="text-right text-[#a294c5] font-bold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <tr>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo}/>
                                    </Avatar>
                                </TableCell>
                                <TableCell  className= 'text-[#dcdae1]'>{company.name}</TableCell>
                                <TableCell  className= 'text-[#dcdae1]'>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal className='text-[#dcdae1]' /></PopoverTrigger>
                                        <PopoverContent className="w-32 bg-[#DBD8E3]">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center  justify-center gap-2 w-fit cursor-pointer bg-[#DBD8E3]'>
                                                <Edit2 className='w-4 bg-[#DBD8E3] text-[#5C5470]' />
                                                <span className='bg-[#DBD8E3] text-[#5C5470] '>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable