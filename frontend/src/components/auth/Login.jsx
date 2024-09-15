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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
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
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 bg-[#DBD8E3]'>
                <h1 className='font-bold text-2xl mb-5 bg-[#DBD8E3] text-[#5C5470] flex justify-center items-center text-center'>Login</h1>
                    <div className='my-2  bg-[#DBD8E3] text-[#5C5470]'>
                        <Label className= ' bg-[#DBD8E3] text-[#5C5470] font-bold text-lg'>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="forexample@gmail.com"
                        />
                    </div>

                    <div className='my-2  bg-[#DBD8E3] text-[#5C5470]'>
                        <Label className= ' bg-[#DBD8E3] text-[#5C5470] font-bold text-lg'>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className='flex items-center justify-between  bg-[#DBD8E3] text-[#5C5470]'>
                        <RadioGroup className="flex items-center gap-4 my-2  bg-[#DBD8E3] text-[#5C5470]">
                            <div className="flex items-center space-x-2  bg-[#DBD8E3] text-[#5C5470]">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label className= ' bg-[#DBD8E3] text-[#5C5470] text-lg font-bold' htmlFor="r1">Student</Label>
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
                                <Label className= "bg-[#DBD8E3] text-[#5C5470] text-lg font-bold" htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? <Button className="w-full my-4 bg-[#5c5470] text-white "> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-[#5c5470] text-white font-bold">Login</Button>
                    }
                    <span className='text-sm bg-[#dbd8e3] text-[#5c5470] flex justify-center items-center text-center gap-2 font-bold'>Don't have an account? <Link to="/signup" className='text-blue-600 bg-[#dbd8e3] font-bold'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login