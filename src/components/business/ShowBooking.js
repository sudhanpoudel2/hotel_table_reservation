import { useState, useEffect, useRef } from "react"
import { getAxiosConfig, fireSwal, closeSwal } from "../../utility/base"
import axios from "axios"
import { BASE_URL } from "../../utility/base_url"
import { toast } from "react-toastify"

const ShowBooking = () => {
    const [bdata, setBdata] = useState([]);
    const [booking_status, setBookingStatus] = useState('');
    const status_ref = useRef(null);
    const [changed, setChange] = useState('');
    const [isRequested, setIsRequested] = useState(true);
    const [isApproved, setIsApproved] = useState(true);
    const [isDisapproved, setIsDisapproved] = useState(true);
    const [isCompleted, setIsCompleted] = useState(true);
    const [isCancelled, setIsCancelled] = useState(true);
    const [date, setDate] = useState('');
    

    useEffect(() => {
        const get_url = BASE_URL + '/business/my-booking'
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            setBdata(result.data)
        })
        .catch(e => {
            console.log(e)
        })
    }, [changed])
    
    let handleChange = select => {
        
        setBookingStatus(prevValue => {
            return select;
        });
        localStorage.setItem('status', select.target.value)
    };

    const updateStatus = (e) => {
        const bid = e.target.getAttribute('data-table-id')
        const data_submit_url = BASE_URL + `/booking/update-status/${bid}`

        const form_elem = status_ref.current
        form_elem.addEventListener('submit', statusSubmit)
        form_elem.setAttribute('data-submit-url', data_submit_url)

        var select = form_elem.elements
        for (var i = 0; i < select.length; i++) {
            if (select[i].nodeName === "SELECT" ) {
                select[i].addEventListener('change', handleChange);
            }
        }
        
        let swal_config = {
            title: "Change Status",
            html: form_elem,
            showConfirmButton: false
        }
        fireSwal(swal_config)
    }

    const statusSubmit = (e) => {
        e.preventDefault()
        const booking_data = {booking_status: localStorage.getItem('status')}
        const submit_url = e.target.getAttribute('data-submit-url')
        
        axios.put(submit_url, booking_data, getAxiosConfig())
        .then(result => {
            if (result.data.success) {
                toast.success(result.data.message, {
                    hideProgressBar: true
                });
                closeSwal()
                localStorage.removeItem('status')
                window.location = window.location
                
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
            toast.error('No result found', {
                hideProgressBar: true
            });
        })
    }

    return(
        <div className="my-5 pt-4">
            <section className="container-fluid bg-secondary">
                <div className="text-center py-3">
                    <p className="fs-1 fw-bold">Bookings</p>
                    <p class="fst-italic">Here are the list of bookings for your restaurant.</p>
                </div>
            </section>
            <div className="container">
                
                <div className="row">
                    <div className="col-sm-12 col-lg-10 mx-auto">
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
                                                        Min: {booking.table_detail.min_capacity} <br/>
                                                        Max: {booking.table_detail.max_capacity}
                                                    </td>
                                                    <td>
                                                        {`
                                                            ${requested_date.getUTCFullYear()}
                                                            -${requested_date.getUTCMonth()+1}
                                                            -${requested_date.getUTCDate()}
                                                        `}
                                                    </td>
                                                    <td>
                                                        {`
                                                            ${start_time.getHours()}: ${start_time.getMinutes()}
                                                            - ${end_time.getHours()}: ${end_time.getMinutes()}
                                                        `}
                                                    </td>
                                                    <td>
                                                        {booking.booking_status}
                                                        <button className="btn btn-sm me-2" data-tooltip="Update" data-table-id={booking._id} onClick={updateStatus}><i class="fas fa-pen text-danger" data-table-id={booking._id}></i></button>
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
                <form ref={status_ref}>
                    <hr/>
                    <div className="mb-3">
                        <select className="form-control">
                            <option value="Requested">Requested</option>
                            <option value="Approved">Approved</option>
                            <option value="Disapproved">Disapproved</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Completed">Completed</option>

                        </select>
                    </div>
                    <div className="d-flex justify-content-center buttonsList">
                        <button type="submit" className="btn btn-outline-primary me-3">Change Status <i class="fas fa-check ms-1"></i></button>
                    </div>
                    
                </form>

            </div>


        </div>
    )
}

export default ShowBooking