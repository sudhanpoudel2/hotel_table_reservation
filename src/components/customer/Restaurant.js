import empty from "../../images/empty.svg"
import account from "../../images/account.png"
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utility/base_url";
import { getAxiosConfig } from "../../utility/base";

const Restaurant = () => {
    const [rdata, setRdata] = useState([]);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const get_url = BASE_URL + '/all-business/'
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            setRdata(result.data)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const tableBtnClicked = (id) => {
        navigate(`/${id}/available-tables`)

    }

    const searchRestro = (e) => {
        e.preventDefault()
        const get_url = BASE_URL + `/search-restaurant/${name}`
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            setRdata(result.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    const navigateToDetail = (e, rid) => {
        e.preventDefault()
        navigate(`/restaurant/${rid}`)
    }
    
    return(
        <div className="pt-4 my-5">
            <section className="container-fluid bg-secondary">
                <div className="text-center py-3">
                    <p className="fs-1 fw-bold">Restaurants</p>
                    <p class="fst-italic">Here are the list of restaurants that are present in the platform.</p>
                    
                </div>
            </section>
            <div class="container mt-5">
                <div class="d-md-flex justify-content-between">
                    <h4>Available Restaurants</h4>
                    <form>
                        <div className="d-flex">
                            <input className="form-control me-2" placeholder="Name of restaurant..." 
                            onChange={(e) => {setName(e.target.value)}}/>
                            <button type="submit" class="btn btn-sm btn-secondary" onClick={searchRestro}>Search</button>
                        </div> 
                    </form>
                    
                </div>
                <div class="row mt-2 g-1 ">
                {rdata.map((restro, index) => {
                    return(
                        <div class="col-sm-6 col-md-4 col-lg-3 mb-3">
                            <div class="card menu-card p-2" style={{width: "14rem"}}>
                                {/* <div class="text-end"> <small>Full Time</small> </div> */}
                                <div class="text-center mt-2 p-3"> 
                                    <a onClick={(e) => navigateToDetail(e, restro._id)} href="#" className="text-dark">
                                        {
                                            restro.user_image === undefined || restro.user_image === '' ?
                                            <img src={account} width="60" className="img-fluid" /> : 
                                            <img src={BASE_URL + `/${restro.user_image}`} className="rounded-circle img-fluid" width="60" />
                                        }
                                        
                                        {/* <span class="d-block font-weight-bold">UX Designer</span> */}
                                        <hr/> 
                                        <span>{restro.name}</span>
                                        <div class="d-flex flex-row align-items-center justify-content-center"> 
                                            <i class="fa fa-map-marker"></i> 
                                            <small class="ms-2"> {restro.address}</small> 
                                        </div>
                                    </a>
                                    <div class="d-flex justify-content-center mt-3"> 
                                        {/* <span>$40,000</span>  */}
                                        <button type="button" onClick={(e) => {tableBtnClicked(restro._id)}} class="btn btn-sm btn-primary py-1">Tables</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                    
                </div>
            </div>
            {/* <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card menu-card">
                            <div className="card-body">
                                <div className="menu-thumbnail mb-2">
                                    <img src={empty} className="img-fluid"/>
                                    {
                                        item.images !== '' ? 
                                        <img src={BASE_URL + `/${item.images}`} className="img-fluid"/> : 
                                        <img src={empty} className="img-fluid"/>
                                    }
                                    
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div> */}

        </div>
    )
}

export default Restaurant