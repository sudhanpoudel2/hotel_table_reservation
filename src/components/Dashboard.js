import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserTypeContext } from "../App";
import { getAxiosConfig } from "../utility/base";
import { BASE_URL } from "../utility/base_url";
import '../utility/dashboard.css';

const Dashboard = () => {
    const {state2, dispatch2} = useContext(UserTypeContext);
    const [total_booking, setTotalBooking] = useState();
    const [total_restaurants, setTotalRestaurants] = useState();
    const [total_tables, setTotalTables] = useState();

    useEffect(() => {
        const get_url = BASE_URL + '/dashboard-data'
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            setTotalBooking(result.data.total_booking)
            setTotalRestaurants(result.data.total_restaurants)
            setTotalTables(result.data.total_tables)
        })
        .catch(e => {
            console.log(e)
        })
    

    }, [])

    const RenderAdminContent = () => {
        
        return (
            <>
                <div class="col-xl-6 col-lg-12">
                        
                        <div class="card l-bg-cherry">
                            <div class="card-statistic-3 p-4">
                                <div class="card-icon card-icon-large pr-3"><i class="fas fa-users"></i></div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0">Total Restaurants</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0">
                                            {total_restaurants}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-12">
                        <div class="card l-bg-blue-dark">
                            <div class="card-statistic-3 p-4">
                                <div class="card-icon card-icon-large pr-3"><i class="fas fa-ticket-alt"></i></div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0">Total Tables</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0">
                                            {total_tables}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
            </>
        )
    }
    

    const RenderBusinessContent = () => {
        
        return (
            <>
                <div class="col-xl-6 col-lg-12">
                        
                        <div class="card l-bg-cherry">
                            <div class="card-statistic-3 p-4">
                                <div class="card-icon card-icon-large pr-3"><i class="fas fa-users"></i></div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0">Total Restaurants</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0">
                                            {total_restaurants}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-12">
                        <div class="card l-bg-blue-dark">
                            <div class="card-statistic-3 p-4">
                                <div class="card-icon card-icon-large pr-3"><i class="fas fa-ticket-alt"></i></div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0">My Tables</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0">
                                            {total_tables}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
            </>
        )
    }

    const RenderCustomerContent = () => {
        return (
            <>
                <div class="col-xl-6 col-lg-12">
                        
                        <div class="card l-bg-cherry">
                            <div class="card-statistic-3 p-4">
                                <div class="card-icon card-icon-large pr-3"><i class="fas fa-users"></i></div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0">Total Restaurants</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0">
                                            {total_restaurants}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-12">
                        <div class="card l-bg-blue-dark">
                            <div class="card-statistic-3 p-4">
                                <div class="card-icon card-icon-large pr-3"><i class="fas fa-ticket-alt"></i></div>
                                <div class="mb-4">
                                    <h5 class="card-title mb-0">Total Bookings</h5>
                                </div>
                                <div class="row align-items-center mb-2 d-flex">
                                    <div class="col-8">
                                        <h2 class="d-flex align-items-center mb-0">
                                            {total_booking}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
            </>
        )
    }

    const username = localStorage.getItem('username')

    return (
        <div className="container-fluid p-0" id="dashboard-div">
            <section className="mt-5 pt-4 bg-secondary">
                <p className="display-4 text-center px-4 pt-4">Welcome {username.toUpperCase()}!</p>
                <h5 className="text-center pb-4 "><em>Here are the stats for you</em></h5>
            </section>
            <div className="container mt-4 pt-4">
                <div className="row">
                    {state2 == 'Customer' ? 
                    RenderCustomerContent() : (state2 == 'Business' ? RenderBusinessContent() : RenderAdminContent())}

                </div>

            </div>
        </div>
    )
}

export default Dashboard