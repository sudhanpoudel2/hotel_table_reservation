import register_image from '../images/register_image.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from "../utility/base_url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from "yup";


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [user_type, setUserType] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [userStatus, setUserStatus] = useState('');
    const submit_url = BASE_URL+"/user/register"

    const formik = useFormik({
        initialValues:{
            username:"",
            email:"",
            user_type:"",
            password:""
        },
        validationSchema: Yup.object({
            username: Yup.string().max(15, "Must be 15 characters or less").min(3, "Must be 3 characters or more").required("User name is Required"),
      
            email: Yup.string().email("Invalid email address").required("Email address is Required"),
      
            password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/, "Must contain minimum 6 and maximum 12 characters, at least one uppercase letter, one lowercase letter, one number and one special character").required("Password is Required"),

            user_type: Yup.string().required("Must choose one stream"),
          }),

          onSubmit: (values) => {
            // console.log("form values", values);
            axios.post(submit_url,values).then(res => {
              setTimeout(() => {
                navigate('/login');
              }, 10000);
              // toastify animation for registration success message
              toast.success("Registration Successful", {
                position: "top-right",
                autoClose: 60,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }).catch(err => {
              console.log("Error is", err.response.data.message);
            //   setUserStatus(err.response.data.message);
            //   toast.error('Username or Email address already exists', {
            //     position: "top-right",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //   });
            })
          }
        });

    // const userRegister = (e) => {
    //     e.preventDefault();
    //     const userData = {username, email, user_type, password};
    //     const submit_url = BASE_URL+"/user/register"

    //     axios.post(submit_url, userData)
    //     .then(result => {
    //         if (result.data.success) {
    //             document.getElementById("RegisterForm").reset();
    //             toast.success(result.data.message, {
    //                 hideProgressBar: true
    //             });
    //             // setTimeout(() => {
    //             //     navigate('/login')
    //             // }, 1500)
    //             navigate('/login')
                
    //         } else {
    //             toast.error(result.data, {
    //                 hideProgressBar: true
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         toast.error("Unable to register", {
    //             hideProgressBar: true
    //         });
    //     })
    // }

    return (
        <div className="container px-5 my-5 pt-5 ">
            {/* <ToastContainer/> */}
            <div class="card signin-card my-5" style={{background: 'black'}}>
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
                                    <form id='RegisterForm'  onSubmit={formik.handleSubmit}>
                                        <div class="mb-3">
                                            <input type="text" class="form-control p-4" placeholder="Username"
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            name="username"
                                            onBlur={formik.handleBlur}/>
                                        </div>
                                        {formik.errors.username && formik.touched.username ? (
              <div className="error"  style={{color:"red"}}>{formik.errors.username}</div>
            ) : null}
                                        <div class="mb-3">
                                            <input type="email" class="form-control p-4" placeholder="Email Address"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            name="email"
                                            onBlur={formik.handleBlur}/>
                                        </div>
                                        {formik.errors.email && formik.touched.email ? (
              <div className="error"  style={{color:"red"}}>{formik.errors.email}</div>
            ) : null}
                                        <div class="mb-3"> 
                                            <select class="form-select form-control px-4" value={formik.values.user_type}
                onChange={formik.handleChange}
                name="user_type"
                onBlur={formik.handleBlur}>
                     {formik.errors.user_type && formik.touched.user_type ? (
              <div className="error"  style={{color:"red"}}>{formik.errors.user_type}</div>
            ) : null}
                                                <option selected value="default">Account Type</option>
                                                <option value="Customer">Customer</option>
                                                <option value="Business">Business</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <input type="password" class="form-control p-4" placeholder="Password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            name="password"
                                            onBlur={formik.handleBlur}/>
                                        </div>
                                        {formik.errors.password && formik.touched.password ? (
              <div className="error" style={{color:"red"}}>{formik.errors.password}</div>
            ) : null}
                                        <div class="mb-3">
                                            <button type="submit" class="btn btn-primary w-100">Create Account</button>
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