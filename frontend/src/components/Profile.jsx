import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector, useDispatch } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import axios from 'axios';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    // Handle file input change
    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        setResumeFile(file);
    };

    // Submit resume file to backend
    const uploadResumeHandler = async () => {
        if (!resumeFile) return;

        const formData = new FormData();
        formData.append('resume', resumeFile);

        try {
            // Assuming your API has an endpoint to upload the resume
            const response = await axios.post('/api/upload-resume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Dispatch an action to update the user profile in the Redux store
            dispatch({ 
                type: 'UPDATE_USER_PROFILE', 
                payload: { resume: response.data.resume, resumeOriginalName: resumeFile.name } 
            });

            alert('Resume uploaded successfully!');

        } catch (error) {
            console.error('Error uploading resume:', error);
            alert('Failed to upload resume. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-[#DBD8E3] border border-gray-200 rounded-2xl my-5 p-8 profile-section'>
                <div className='flex justify-between bg-[#DBD8E3]'>
                    <div className='flex items-center gap-4 bg-[#DBD8E3]'>
                        <Avatar className="h-24 w-24 ">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div className='bg-[#DBD8E3]'>
                            <h1 className='font-medium text-xl bg-[#DBD8E3] text-[#5C5470]'>{user?.fullname}</h1>
                            <p className='bg-[#DBD8E3] text-[#5C5470]'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button className='bg-[#DBD8E3] text-right' onClick={() => setOpen(true)} variant=""><Pen className='bg-[#DBD8E3] text- [#5C5470]' /></Button>
                </div>
                <div className='my-5 bg-[#DBD8E3]'>
                    <div className='flex items-center gap-3 my-2 bg-[#DBD8E3]'>
                        < Mail className='bg-[#DBD8E3] text-[#5C5470]' />
                        <span className='bg-[#DBD8E3] text-[#5C5470]'>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2 bg-[#DBD8E3]'>
                        <Contact className='bg-[#DBD8E3] text-[#5C5470]' />
                        <span className='bg-[#DBD8E3] text-[#5C5470]'>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='text-md font-bold bg-[#DBD8E3] text-[#5C5470]'>Skills</h1>
                    <div className='flex items-center gap-1 bg-[#DBD8E3]'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => (
                                <Badge key={index} className={"bg-[#5c5470] text-white"}>{item}</Badge>
                            )) : <span className='bg-[#5c5470] text-white rounded-md p-1'>Not available</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center bg-[#DBD8E3]'>
                    <Label className="text-md font-bold bg-[#DBD8E3] text-[#5C5470]">Resume</Label>
                    {
                        user?.profile?.resume ? (
                            <a target='_blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer bg-[#DBD8E3]'>{user?.profile?.resumeOriginalName}</a>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <span className='bg-[#5c5470] text-white p-1 rounded-md'>Not available</span>
                                <input type='file' onChange={handleResumeChange} />
                                <Button onClick={uploadResumeHandler}>Upload Resume</Button>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-3xl text-[#c5b4ef]'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
