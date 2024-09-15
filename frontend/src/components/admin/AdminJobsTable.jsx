import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{ 
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption className= 'text-[#a294c5]'>A list of your recent  posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className= 'text-[#a294c5] font-bold'>Company Name</TableHead>
                        <TableHead className= 'text-[#a294c5] font-bold'>Role</TableHead>
                        <TableHead className= 'text-[#a294c5] font-bold'>Date</TableHead>
                        <TableHead className="text-right text-[#a294c5] font-bold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr>
                                <TableCell className= 'text-[#dcdae1]'>{job?.company?.name}</TableCell>
                                <TableCell className= 'text-[#dcdae1]'>{job?.title}</TableCell>
                                <TableCell className= 'text-[#dcdae1]'>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer text-[#dcdae1]">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32 bg-[#DBD8E3]">
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer bg-[#DBD8E3]'>
                                                <Edit2 className='w-4 bg-[#DBD8E3] text-[#5C5470]' />
                                                <span className='bg-[#DBD8E3] text-[#5C5470]'>Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2 bg-[#DBD8E3]'>
                                                <Eye className='w-4 bg-[#DBD8E3] text-[#5C5470]'/>
                                                <span className='bg-[#DBD8E3] text-[#5C5470]' >Applicants</span>
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

export default AdminJobsTable