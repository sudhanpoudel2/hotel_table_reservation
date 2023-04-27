import { Link } from 'react-router-dom';
import '../utility/home.css';
const Home = () => {
    return(
        <div className="mt-5 pt-4" id="home-div">
            <div className='container mt-5 pt-5'>
                <p className='display-4 text-white mt-5 pt-5'>Reserve your table today</p>
                <Link to="/register">
                    <a href='#' className='btn btn-secondary'>Get Started <i class="fas fa-arrow-right"></i></a>
                </Link>
                
            </div>
            
        </div>
    )
}

export default Home