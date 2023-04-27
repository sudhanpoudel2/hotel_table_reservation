import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { getAxiosConfig } from "../../utility/base"
import { BASE_URL } from "../../utility/base_url"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { closeSwal, fireSwal } from "../../utility/base"

const MyBooking = () => {
    const [isRequested, setIsRequested] = useState(true);
    const [isApproved, setIsApproved] = useState(true);
    const [isDisapproved, setIsDisapproved] = useState(true);
    const [isCompleted, setIsCompleted] = useState(true);
    const [isCancelled, setIsCancelled] = useState(true);
    const [date, setDate] = useState('');
    const [bdata, setBdata] = useState([]);
    const navigate = useNavigate()

    const del_ref = useRef(null);

    useEffect(() => {
        const get_url = BASE_URL + '/my-bookings'
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            setBdata(result.data)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const filterBookings = (e) => {
        e.preventDefault()
        let status_types = []
        const submit_url = BASE_URL + '/booking/filter'
        if (isRequested) {
            status_types.push('Requested')
        } 
        if (isApproved) {
            status_types.push('Approved')
        }
        if (isDisapproved) {
            status_types.push('Disapproved')
        }
        if (isCancelled) {
            status_types.push('Cancelled')
        }
        if (isCompleted) {
            status_types.push('Completed')
        }
        const booking_data = {status_types: status_types, date: date}
        
        axios.post(submit_url, booking_data, getAxiosConfig())
        .then(result => {
            if(result.data.length > 0) {
                setBdata(result.data)
            } else {
                toast.error('No results!', {
                    hideProgressBar: true
                });
            }
            
        })
        .catch(e => {
            console.log(e)
            toast.error('Unable to delete', {
                hideProgressBar: true
            });
        })
    }

    const redirectToForm = (id) => {
        navigate(`/booking/${id}/update`)
    }


    const delClick = (tid) => {
        const data_submit_url = BASE_URL + `/booking/delete/${tid}`

        const form_elem = del_ref.current
        form_elem.addEventListener('submit', delSubmit)
        form_elem.setAttribute('data-submit-url', data_submit_url)

        var buttons = form_elem.elements
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].nodeName === "BUTTON" && buttons[i].type === "button") {
              buttons[i].addEventListener('click', closeSwal);
            }
        }
        
        let swal_config = {
            title: "Delete Booking",
            html: form_elem,
            showConfirmButton: false
        }
        fireSwal(swal_config)
    }

    const delSubmit = (e) => {
        e.preventDefault()
        let del_url = e.target.getAttribute('data-submit-url')
        axios.delete(del_url, getAxiosConfig())
        .then(result => {
            if (result.status == 204) {
                toast.success(result.data.message, {
                    hideProgressBar: true
                });
                window.location.reload()
            } else {
                toast.error(result.data.message, {
                    hideProgressBar: true
                });
            }
            
        })
        .catch(e => {
            console.log(e)
            toast.error('Unable to delete', {
                hideProgressBar: true
            });
        })
    }

    return(
        <div className="my-5 pt-4">
            <section className="container-fluid bg-secondary">
                <div className="text-center py-3">
                    <p className="fs-1 fw-bold">My Bookings</p>
                    <p class="fst-italic">Here are the bookings you have made so far.</p>
                </div>
            </section>
            <div className="container">
                
                <div className="row">
                    <div className="col-sm-12 col-lg-10 mx-auto mb-5">
                        <div className="filter-section mt-4">
                            <h3 className="text-dark">Filter Bookings <i class="fas fa-filter"></i></h3>
                            <hr/>
                            <form>
                                <div className="row">
                                    <div className="status col-lg-12 col-md-6">
                                        <h3>Status:</h3>
                                        <div class="mb-3 d-lg-flex">
                                            <div className="me-3 mb-2 d-flex align-items-center">
                                                <label class="me-2 text-dark fw-bold" for="requested">Requested:</label>
                                                <input class="apple-switch" type="checkbox" id="requested" 
                                                checked={isRequested} 
                                                onChange={(e) => {setIsRequested(!isRequested)}}/>
                                            </div>
                                            <div className="me-3 mb-2 d-flex align-items-center">
                                                <label class="me-2 text-dark fw-bold" for="approved">Approved:</label>
                                                <input class="apple-switch" type="checkbox" id="approved" 
                                                checked={isApproved} 
                                                onChange={(e) => {setIsApproved(!isApproved)}}/>
                                            </div>
                                            <div className="me-3 mb-2 d-flex align-items-center">
                                                <label class="me-2 text-dark fw-bold" for="cancelled">Cancelled:</label>
                                                <input class="apple-switch" type="checkbox" id="cancelled" 
                                                checked={isCancelled} 
                                                onChange={(e) => {setIsCancelled(!isCancelled)}}/>
                                            </div>
                                            <div className="me-2 mb-2 d-flex align-items-center">
                                                <label class="me-2 text-dark fw-bold" for="disapproved">Disapproved:</label>
                                                <input class="apple-switch" type="checkbox" id="disapproved" 
                                                checked={isDisapproved} 
                                                onChange={(e) => {setIsDisapproved(!isDisapproved)}}/>
                                            </div>
                                            <div className="me-2 mb-2 d-flex align-items-center">
                                                <label class="me-2 text-dark fw-bold" for="completed">Completed:</label>
                                                <input class="apple-switch" type="checkbox" id="completed" 
                                                checked={isCompleted} 
                                                onChange={(e) => {setIsCompleted(!isCompleted)}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="date">
                                            <h3>Select Date:</h3>
                                            <input type="date" className="form-control" 
                                            value={date} 
                                            onChange={(e) => {setDate(e.target.value)}}/>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex justify-content-center my-2 ">
                                        <button type="submit" className="btn btn-secondary" onClick={filterBookings}>Apply Filter <i class="fa fa-paper-plane ms-2"></i></button>
                                    </div>
                                    

                                </div>
                                
                            </form>
                            <hr/>
                            

                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped custom-table text-center">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Booking By</th>
                                        <th>Total Seats</th>
                                        <th>Table Number</th>
                                        <th>Table Capacity</th>
                                        <th>Requested Date</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {bdata.map((booking, index) => {
                                        const requested_date = new Date(booking.requested_for)
                                        const start_time = new Date(booking.start_time)
                                        const end_time = new Date(booking.end_time)
                                        return(
                                            <>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{booking.user_detail.username}</td>
                                                    <td>{booking.total_seats}</td>
                                                    <td>{booking.table_detail.table_number}</td>
                                                    <td>
                                                        Minimum: {booking.table_detail.min_capacity} <br/>
                                                        Maximum: {booking.table_detail.max_capacity}
                                                    </td>
                                                    <td>
                                                        {`
                                                            ${requested_date.getUTCFullYear()}-${requested_date.getUTCMonth()+1}-${requested_date.getUTCDate()}
                                                        `}
                                                    </td>
                                                    <td>
                                                        {`
                                                            ${start_time.getHours()} : ${start_time.getMinutes()}
                                                            - ${end_time.getHours()} : ${end_time.getMinutes()}
                                                        `}
                                                    </td>
                                                    <td>{booking.booking_status}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-center buttonsList">
                                                            <button type="button" className="btn btn-sm btn-outline-primary me-2" data-tooltip="Update" onClick={(e) => {redirectToForm(booking._id)}}><i class="far fa-edit"></i></button>
                                                            <button type="button" className="btn btn-sm btn-outline-danger" data-tooltip="Delete" onClick={(e) => {delClick(booking._id)}}><i class="far fa-trash-alt"></i></button>
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
            <div className="d-none">
                <form ref={del_ref}>
                    <p>Are you sure you want to delete this?</p>
                    <hr/>
                    <div className="d-flex justify-content-center buttonsList">
                        <button type="submit" className="btn btn-outline-primary me-3">Yes</button>
                        <button type="button" className="btn btn-outline-danger me-3 close-btn" onClick={closeSwal}>No</button>
                    </div>
                    
                </form>

            </div>
        </div>
    )
}

export default MyBooking