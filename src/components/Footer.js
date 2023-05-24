import project_logo from '../images/project_logo.jpg'
import logo from "../images/logo.png"

const Footer = () => {
    return(
        <>
            <footer class="site-footer">
              <div class="container">
                <div class="row d-flex justify-content-between">
                  <div class="col-lg-3 col-md-6">
                    <section class="widget widget-light-skin">
                      <img src={logo} className="img-fluid rounded-circle" width="100" height="100" />
                      <p className='text-white h3 text-light'>Restaurant Bookings</p>
                    </section>
                  </div>
                  <div class="col-lg-3 col-md-6">
                    <section class="widget widget-light-skin">
                      <h3 class="widget-title">About Us</h3>
                      <p class="text-white">
                      A restaurant is a business formation which prepares and serves food and drink to customers in return for money, either paid before the meal, after the meal, or with a running tab. Meals are generally served and eaten on premises.                      </p>
                      {/* <ul class="list-unstyled text-sm text-white">
                        <li><span class="opacity-50">Monday-Friday:</span>9.00 am - 8.00 pm</li>
                        <li><span class="opacity-50">Saturday:</span>10.00 am - 6.00 pm</li>
                      </ul> */}
                      {/* <p><a class="navi-link-light" href="#">support@unishop.com</a></p><a class="social-button shape-circle sb-facebook sb-light-skin" href="#"><i class="socicon-facebook"></i></a><a class="social-button shape-circle sb-twitter sb-light-skin" href="#"><i class="socicon-twitter"></i></a><a class="social-button shape-circle sb-instagram sb-light-skin" href="#"><i class="socicon-instagram"></i></a><a class="social-button shape-circle sb-google-plus sb-light-skin" href="#"><i class="socicon-googleplus"></i></a> */}
                    </section>
                  </div>
                  <div class="col-lg-3 col-md-6">
                    <section class="widget widget-light-skin">
                      <h3 class="widget-title">Contact Us</h3>
                      
                      <ul class="list-unstyled text-sm text-white">
                        <li><span class="opacity-50 me-2">Monday-Friday:</span>9.00 am - 8.00 pm</li>
                        <li><span class="opacity-50 me-2">Saturday:</span>10.00 am - 6.00 pm</li>
                      </ul>
                      <p><a class="navi-link-light text-secondary" href="#">rbooking@email.com</a></p><a class="social-button shape-circle sb-facebook sb-light-skin" href="#"><i class="socicon-facebook"></i></a><a class="social-button shape-circle sb-twitter sb-light-skin" href="#"><i class="socicon-twitter"></i></a><a class="social-button shape-circle sb-instagram sb-light-skin" href="#"><i class="socicon-instagram"></i></a><a class="social-button shape-circle sb-google-plus sb-light-skin" href="#"><i class="socicon-googleplus"></i></a>
                    </section>
                  </div>
                </div>
                <hr class="hr-light mt-2 margin-bottom-2x" />

                <p class="footer-copyright">&copy; All rights reserved.</p>
              </div>
            </footer>
        </>
    )
}
export default Footer