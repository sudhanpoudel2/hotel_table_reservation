import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getAxiosConfig } from "../../utility/base";
import { BASE_URL } from "../../utility/base_url";
import account from '../../images/account.png'
import empty from '../../images/empty.svg'

const RestroProfile = () => {
    const {rid} = useParams();
    const [restroData, setRestroData] = useState('');
    const [tags, setTags] = useState([]);
    const [idata, setIdata] = useState([]);

    useEffect(() => {
        const get_url = BASE_URL + `/users-items/${rid}`
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            setRestroData(result.data.user)
            setTags(result.data.user.tags)
            setIdata(result.data.items)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    return(
        <div className="my-5 pt-4">
            <section className="bg-secondary container-fluid">
                <div className="container py-5">
                    <div className="text-center text-md-start d-md-flex align-items-center">
                        {
                            restroData.user_image === undefined || restroData.user_image === ''? 
                            <img src={account} width="80" className="img-fluid rounded-circle mb-2" />:
                            <img src={BASE_URL + `/${restroData.user_image}`} className="mb-2 rounded-circle img-fluid" width="80" />
                        }
                        <div>
                            <h3 className="ms-3">{restroData.name}</h3>
                            <span className="ms-3"><i class="fa fa-map-marker me-2"></i>{restroData.address}</span>
                            <div className="scrollmenu mx-3 mt-3">
                                {tags.map(tag => {
                                    return(
                                        <button type="button" className="btn btn-primary px-3 py-0 me-2">{tag}</button>
                                    )
                                })}
                            </div>
                        </div>
                        
                    </div>
                    

                </div>
            </section>
            <div className="container my-4">
                <h5>About Us</h5>
                <p className="text-muted">
                    {restroData.bio}
                </p>

                <h5>Menu</h5>
                <div className="row">
                    <div className="col-12 mx-auto pb-4">
                        <div className="row">
                            {idata.map((item, index) => {
                                return(
                                    <div className="col-md-6">
                                        <div className="card menu-card d-flex mb-4">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center">
                                                    <div className="mb-2">
                                                        {
                                                            item.images !== '' ? 
                                                            <img src={BASE_URL + `/${item.images}`} className="img-fluid rounded-circle" width="70"/> : 
                                                            <img src={empty} className="img-fluid rounded-circle" width="70"/>
                                                        }
                                                        
                                                    </div>
                                                    <div className="ms-3 w-100">
                                                        <div className="d-flex justify-content-between">
                                                        <p className="h4 text-dark">{item.name}</p>
                                                        <span><strong>Nrs. </strong>{item.price}</span>
                                                        </div>
                                                        
                                                        <div className="scrollmenu">
                                                            {item.category_info.map(category => {
                                                                return(
                                                                    <button type="button" className="btn btn-primary px-3 py-0 me-2">{category.name}</button>
                                                                )
                                                            })}
                                                        </div>
                                                        <p>
                                                            {item.description}
                                                        </p>
                                                        
                                                        
                                                        
                                                    </div>
                                                </div> 
                                                
                                                
                                            </div>
                                            

                                        </div>

                                    </div>
                                )
                            })}
                            

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default RestroProfile;