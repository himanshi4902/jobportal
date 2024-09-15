import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl  bg-[#DBD8E3] border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-bold text-lg text-[#1e3d58] bg-[#DBD8E3]'>{job?.company?.name}</h1>
                <p className='text-sm text-[#1e3d58]  bg-[#DBD8E3]'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg text-[#1e3d58] bg-[#DBD8E3]'>{job?.title}</h1>
                <p className='text-sm text-[#1e3d58]  bg-[#DBD8E3]'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4  bg-[#DBD8E3]'>
                <Badge className={'bg-[#5c5470] text-white'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'bg-[#5c5470] text-white'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'bg-[#5c5470] text-white'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards