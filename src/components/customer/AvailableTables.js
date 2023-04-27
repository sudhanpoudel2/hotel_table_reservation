import account from "../../images/account.png"
import { useState, useEffect } from "react"
import axios from "axios"
import { getAxiosConfig } from "../../utility/base"
import { BASE_URL } from "../../utility/base_url"
import { useNavigate, useParams } from "react-router-dom"

const AvailableTables = () => {
    const {rid} = useParams()
    const [tdata, setTdata] = useState([])
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const get_url = BASE_URL + `/user/${rid}/available/tables`
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            const user = result.data.user 
            setTdata(result.data.tables)
            setName(user.name)
            setAddress(user.address)
            setImage(user.user_image)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const handleBookTable = (tid) => {
        navigate(`/table/${tid}/book`)
    }

    return(
        <div className="pt-4 my-5">
            <section className="container-fluid bg-secondary">
                <div className="text-center py-3">
                    <p className="fs-1 fw-bold">Available Tables</p>
                    <p class="fst-italic">Here are the list of tables available for this restaurant.</p>
                    <hr className="container"/>
                    
                    <div className="d-flex justify-content-center align-items-center">
                        {
                            image === undefined || image === '' ? 
                            <img src={account} width="60" className="img-fluid" />:
                            <img src={BASE_URL + `/${image}`} className="img-fluid rounded-circle" width="60" />
                        }
                        <div className="align-items-center ms-3">
                            <p className="m-0">{name}</p>
                            <p className="m-0 ms-2">
                                <i class="fa fa-map-marker"></i><small class="ms-1"> {address}</small>
                            </p> 
                        </div>

                    </div>
                </div>
            </section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-lg-9 mx-auto">
                        <div className="table-responsive">
                            <table className="table table-striped custom-table text-center">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Table Number</th>
                                        <th>Minimum Capacity</th>
                                        <th>Maximum Capacity</th>
                                        <th>Is Available</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {tdata.map((table, index) => {
                                        return(
                                            <>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{table.table_number}</td>
                                                    <td>{table.min_capacity}</td>
                                                    <td>{table.max_capacity}</td>
                                                    <td className="text-capitalize">{table.isAvailable.toString()}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-center buttonsList">
                                                            <button className="btn btn-sm btn-outline-primary" data-tooltip="Update" onClick={(e) => {handleBookTable(table._id)}} ><i class="fa fa-ticket me-2"></i> Book Now</button>
                                                        </div>
                                                        
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AvailableTables
