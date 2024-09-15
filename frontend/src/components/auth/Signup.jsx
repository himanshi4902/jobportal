import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 mt-4 bg-[#DBD8E3] text-[#5C5470]'>
                    <h1 className='font-bold text-2xl mb-5 flex justify-center items-center text-center bg-[#DBD8E3] text-[#5C5470] '>Sign Up</h1>
                    <div className='my-2 bg-[#DBD8E3]'>
                        <Label className='bg-[#DBD8E3] text-[#5C5470] font-bold text-lg'>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter Full name"
                        />
                    </div>
                    <div className='my-2 bg-[#DBD8E3] text-[#5C5470]'>
                        <Label className='bg-[#DBD8E3] text-[#5C5470] font-bold text-lg'>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter Email"
                        />
                    </div>
                    <div className='my-2 bg-[#DBD8E3] text-[#5C5470]'>
                        <Label className='bg-[#DBD8E3] text-[#5C5470] font-bold text-lg'>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Enter Phone Number"
                        />
                    </div>
                    <div className='my-2 bg-[#DBD8E3] text-[#5C5470]'>
                        <Label className='bg-[#DBD8E3] text-[#5C5470] font-bold text-lg'>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter Password"
                        />
                    </div>
                    <div className='flex items-center justify-between bg-[#DBD8E3] text-[#5C5470]'>
                        <RadioGroup className="flex items-center gap-4 my-5 bg-[#DBD8E3] text-[#5C5470]">
                            <div className="flex items-center space-x-2 bg-[#DBD8E3] text-[#5C5470]">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label className='bg-[#DBD8E3] text-[#5C5470] text-lg font-bold' htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2 bg-[#DBD8E3] text-[#5C5470]">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label className='bg-[#DBD8E3] text-[#5C5470] text-lg font-bold' htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2 bg-[#DBD8E3] text-[#5C5470]'>
                            <Label className='bg-[#DBD8E3] text-[#5C5470] font-bold text-lg'>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                name="profile"
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4 bg-[#5c5470] text-white"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-[#5c5470] text-white">Signup</Button>
                    }
                    <span className='text-sm flex items-center justify-center bg-[#dbd8e3] text-[#5c5470] gap-2 font-bold'>Already have an account? <Link to="/login" className='text-blue-600 font-bold bg-[#dbd8e3]'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup