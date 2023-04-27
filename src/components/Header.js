import account from '../images/account.png'
import project_logo from '../images/project_logo.jpg'
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext, UserTypeContext } from "../App";
import { BASE_URL } from '../utility/base_url';

const Header = () => {
    const {state, dispatch} = useContext(UserContext);
    const {state2, dispatch2} = useContext(UserTypeContext);
    

    const RenderBusinessMenu = () => {
        return (
            <>
                <li class="nav-item">
                    <Link to="/home">
                        <a class="nav-link">Home</a>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="/my-tables">
                        <a class="nav-link">Tables</a>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="/my-items">
                        <a class="nav-link">Menu</a>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="/show-bookings">
                        <a class="nav-link">Bookings</a>
                    </Link>
                </li>
            </>
        )
    }

    const RenderCustomerMenu = () => {
        return (
            <>
                <li class="nav-item">
                    <Link to="/home">
                        <a class="nav-link">Home</a>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="/all-restaurants">
                        <a class="nav-link">Restaurants</a>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="/my-bookings">
                        <a class="nav-link">Bookings</a>
                    </Link>
                </li>
            </>
        )
    }

    const RenderAdminMenu = () => {
        return (
            <>
                <li class="nav-item">
                    <Link to="/home">
                        <a class="nav-link">Home</a>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to="/category-list">
                        <a class="nav-link">Categories</a>
                    </Link>
                </li>
            </>
        )
    }

    let navLinks = <></>
    if (state2==='Business') {
        navLinks = RenderBusinessMenu()
    } else if (state2 === 'Customer') {
        navLinks = RenderCustomerMenu()
    } else if (state2 === 'Admin') {
        navLinks = RenderAdminMenu()
    }

    const RenderMenu = () => {    
        if (state) {
            const username = localStorage.getItem('username')
            const user_type = localStorage.getItem('user_type')
            const user_image = localStorage.getItem('user_image')
            return(
                <>
                    <div class="dropdown justify-content-end">
                        <a class="btn dropdown-toggle p-0" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            {
                                user_image == undefined || user_image === '' || user_image == 'undefined'? 
                                <img src={account} className="img-fluid profile-icon dropdown-toggle" />:
                                <img class="img-fluid profile-icon dropdown-toggle rounded-circle" src={BASE_URL + `/${user_image}`} width="60" alt="" />
                            }
                        </a>

                        <ul class="dropdown-menu px-2 dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                            <li><span className='fw-bold text-uppercase fs-5 dropdown-item'>{username}</span></li>
                            <li><span className='dropdown-item fw-bold text-spacing'>{user_type}</span></li>
                            <hr className='my-2'/>
                            <li>
                                <Link to="/profile">
                                    <a class=" dropdown-item">Profile </a>
                                </Link>
                                <Link to="/logout">
                                    <a class=" dropdown-item">Logout <i class="fas fa-sign-out-alt text-danger ms-1"></i> </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </>
                
                
            )
        } else {
            return(
                <>
                    <Link to="/login">
                        <a class="btn get-started-btn">Login</a>
                    </Link>
                </>
                
            )
        }
    }

    return(
        <header id="header" className="fixed-top ">
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container">
                    <Link to="/">
                    <a class="navbar-brand text-dark order-sm-1" href="#">
                        <img src={project_logo} className="img-fluid rounded-circle" width="60" />
                    </a>
                    </Link>
                    <div className='d-flex order-lg-3 order-sm-2'>
                        <button class="navbar-toggler me-3 text-dark justify-content-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon text-dark"></span>
                        </button>
                        
                        <RenderMenu />
                    </div>
                    <div class="collapse navbar-collapse order-lg-2 order-sm-3" id="navbarSupportedContent">
                        <ul class="navbar-nav text-dark mb-2 mb-lg-0">
                            {navLinks}             
                        </ul>
                    </div>
                    
                    
                    
                    
                </div>
            </nav>
        </header>
    )
}
export default Header