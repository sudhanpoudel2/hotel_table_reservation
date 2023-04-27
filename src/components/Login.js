import { Link } from "react-router-dom"
import { useState, useContext } from 'react'
import axios from 'axios'
import { BASE_URL } from "../utility/base_url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { UserContext, UserTypeContext } from "../App";

const Login = () => {
    const {state, dispatch} = useContext(UserContext);
    const {state2, dispatch2} = useContext(UserTypeContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userLogin = (e) => {
        e.preventDefault();
        const userData = {username, password};
        const submit_url = BASE_URL+"/user/login"

        axios.post(submit_url, userData)
        .then(result => {
            if (result.data.success) {
                toast.success(result.data.message, {
                    hideProgressBar: true
                });
                const userdetails = result.data.userdetails
                document.getElementById("LoginForm").reset();
                localStorage.setItem('token', result.data.token)
                localStorage.setItem('isAuthenticated', true)
                localStorage.setItem('userId', userdetails.userId)
                localStorage.setItem('username', userdetails.username)
                localStorage.setItem('email', userdetails.email)
                localStorage.setItem('user_type', userdetails.user_type)
                localStorage.setItem('user_image', userdetails.user_image)
                dispatch({type: 'USER', payload: true})
                dispatch2({type: 'USERTYPE', payload: userdetails.user_type})
                navigate('/home')
                
            } else {
                toast.error(result.data, {
                    hideProgressBar: true
                });
            }
        })
        .catch(err => {
            console.log(err)
            toast.error("Unable to login", {
                hideProgressBar: true
            });
        })
    }
    return (
        <div className="container px-5 pt-5 mt-5">
            {/* <ToastContainer/> */}
            <div className="row">
                <div className="col-sm-9 col-md-8 col-lg-7 mx-auto">
                    <div className="card signin-card my-5">
                        <div className="card-body px-md-5 py-3 form-text">
                            <h3 className="text-center text-uppercase mb-4">Sign In</h3>
                            <form id="LoginForm">
                                <div class="mb-3">
                                    <input type="text" class="form-control p-4" placeholder="Username"
                                    onChange={(e)=>setUsername(e.target.value)}/>
                                </div>
                                <div class="mb-3">
                                    <input type="password" class="form-control p-4" placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}/>
                                </div>
                                <div class="mb-3">
                                    <button type="submit" class="btn btn-primary w-100" onClick={userLogin}>Sign In</button>
                                </div>
                            </form>
                            <hr/>
                            <div className='d-flex justify-content-center form-text'>
                                <h6 className='fw-bold me-2'>Don't have an account?</h6>
                                <h6 className="">
                                    <Link to="/register">
                                        <span className='login-link'>Signup <i class="fas fa-angle-double-right"></i></span>
                                    </Link>
                                </h6>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
