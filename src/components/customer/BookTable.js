import empty from '../../images/empty.svg'
import account from '../../images/account.png'
import { BASE_URL } from '../../utility/base_url'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getAxiosConfig } from '../../utility/base'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const BookTable = () => {
    const {tid} = useParams();

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('')
    const [table_number, setTableNo] = useState('')
    const [min_capacity, setMinCapacity] = useState('')
    const [max_capacity, setMaxCapacity] = useState('')
    const navigate = useNavigate();

    // const [created_date, setCreatedDate] = useState('')
    const [requested_for, setRequestedFor] = useState('')
    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')
    const [total_seats, setTotalSeats] = useState('')
    const [table, setTable] = useState(tid)
    const [user, setUser] = useState(localStorage.getItem('userId'))

    useEffect(() => {
        const get_url = BASE_URL + `/table/${tid}`
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            const data = result.data
            setName(data.user_detail.name)
            setAddress(data.user_detail.address)
            setImage(data.user_detail.user_image)
            setTableNo(data.table_number)
            setMinCapacity(data.min_capacity)
            setMaxCapacity(data.max_capacity)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const reserveClick = (e) => {
        e.preventDefault()
        let now = new Date()
        let created_date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
        let modified_st = requested_for+"T"+start_time
        let modified_et = requested_for+"T"+end_time
        const bookingData = {
            created_date, 
            requested_for, 
            start_time: modified_st, 
            end_time: modified_et, 
            total_seats,
            table,
            user
        }

        let submit_url = BASE_URL + "/book/table"

        axios.post(submit_url, bookingData, getAxiosConfig())
        .then(result => {
            if (result.data.success) {
                document.getElementById("BookingForm").reset();
                toast.success(result.data.message, {
                    hideProgressBar: true
                });
                
                
            } else {
                toast.error(result.data.message, {
                    hideProgressBar: true
                });
            }
        })
        .catch(err => {
            console.log(err)
            toast.error("Unable to submit", {
                hideProgressBar: true
            });
        })
    }

    const goBack = (e) => {
        window.history.back()
    }

    return(
        <div className="my-5 pt-5 container">
            <div className="row">
                <div className="col-lg-9 mx-auto">
                    <div className="card add-item-card p-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-4 pt-lg-5 updateFormContainer">
                                    <div className=' form-text my-3'>
                                        <div class="mb-3 text-center text-dark">
                                            {
                                                image === undefined || image === ''? 
                                                <img src={account} width="60" className="img-fluid rounded-circle" />:
                                                <img src={BASE_URL + `/${image}`} className="rounded-circle img-fluid" width="60" />
                                            }
                                            
                                            <p className='h5 text-capitalize mt-3'>{name}</p>
                                            <div class="d-flex flex-row align-items-center justify-content-center"> 
                                                <i class="fa fa-map-marker"></i> 
                                                <small class="ms-2"> {address}</small> 
                                            </div>
                                            <hr/>
                                            <h5>Table Details:</h5>
                                            <p >Table Number: {table_number}</p>
                                            <p >Minimum Capacity: {min_capacity}</p>
                                            <p >Maximum Capacity: {max_capacity}</p>

                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 ">
                                    <h3 className="text-center text-uppercase text-primary mb-4">Book Table</h3>
                                    <form id="BookingForm" className="text-dark">
                                        <div class="mb-3 form-group">
                                            <label className="mb-1 fw-bold">Booking For</label>
                                            <input type="date" class="form-control p-4" placeholder="Date"
                                            onChange={(e) => setRequestedFor(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3 form-group row">
                                            <div className='col-md-6'>
                                                <label className="mb-1 fw-bold">Start Time</label>
                                                <input type="time" className='form-control'
                                                onChange={(e) => setStartTime(e.target.value)}/>
        
                                            </div>
                                            <div className='col-md-6'>
                                                <label className="mb-1 fw-bold">End Time</label>
                                                <input type="time" className='form-control'
                                                onChange={(e) => setEndTime(e.target.value)}/>
                                            </div>
                                            
                                        </div>
                                        
                                        <div class="mb-3 form-group">
                                            <label className="mb-1 fw-bold">Total Seats</label>
                                            <input type="number" class="form-control p-4" placeholder="Total Seats"
                                            onChange={(e) => setTotalSeats(e.target.value)}/>
                                        </div>
                                        <div class="mb-3 d-flex justify-content-center">
                                            <button type="submit" class="btn btn-primary me-3" onClick={reserveClick}>Reserve <i class="far fa-check-square ms-2"></i></button>
                                            <button type="button" class="btn btn-secondary me-3" onClick={goBack}>Go Back <i class="fas fa-backward ms-2"></i></button>
                                        </div>
                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default BookTable