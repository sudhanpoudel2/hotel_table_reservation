import register_image from '../images/register_image.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from "../utility/base_url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [user_type, setUserType] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userRegister = (e) => {
        e.preventDefault();
        const userData = {username, email, user_type, password};
        const submit_url = BASE_URL+"/user/register"

        axios.post(submit_url, userData)
        .then(result => {
            if (result.data.success) {
                document.getElementById("RegisterForm").reset();
                toast.success(result.data.message, {
                    hideProgressBar: true
                });
                // setTimeout(() => {
                //     navigate('/login')
                // }, 1500)
                navigate('/login')
                
            } else {
                toast.error(result.data, {
                    hideProgressBar: true
                });
            }
        })
        .catch(err => {
            console.log(err)
            toast.error("Unable to register", {
                hideProgressBar: true
            });
        })
    }

    return (
        <div className="container px-5 my-5 pt-5 ">
            {/* <ToastContainer/> */}
            <div class="card signin-card my-5" style={{background: '#EE6A3E'}}>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-5 d-none d-md-flex">
                            <img src={register_image} className='register-img img-fluid rounded' alt='Register'></img>
                        </div>
                        <div class="col-md-7 ps-md-5 mx-auto">
                            <div className='row'>
                                <div className='form-text col-lg-10'>
                                    <p className='display-4'>Welcome</p>
                                    <p className='mb-4'>Create your account and start exploring</p>
                                    <form id='RegisterForm'>
                                        <div class="mb-3">
                                            <input type="text" class="form-control p-4" placeholder="Username"
                                            onChange={(e)=>setUsername(e.target.value)}/>
                                        </div>
                                        <div class="mb-3">
                                            <input type="email" class="form-control p-4" placeholder="Email Address"
                                            onChange={(e)=>setEmail(e.target.value)}/>
                                        </div>
                                        <div class="mb-3"> 
                                            <select class="form-select form-control px-4" onChange={(e)=>setUserType(e.target.value)}>
                                                <option selected value="default">Account Type</option>
                                                <option value="Customer">Customer</option>
                                                <option value="Business">Business</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <input type="password" class="form-control p-4" placeholder="Password"
                                            onChange={(e)=>setPassword(e.target.value)}/>
                                        </div>
                                        <div class="mb-3">
                                            <button type="submit" class="btn btn-primary w-100" onClick={userRegister}>Create Account</button>
                                        </div>
                                    </form>
                                    <hr/>
                                    <div className='text-center'>
                                        <h6 className='fw-bold d-inline me-2'>Already Registered?</h6>
                                        <h6 className='d-inline'>
                                            <Link to="/login">
                                                <span className='login-link'>Login <i class="fas fa-angle-double-right"></i></span>
                                            </Link>
                                        </h6>
                                    </div>

                                </div>

                            </div>

                            
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register