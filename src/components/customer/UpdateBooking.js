import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getAxiosConfig } from "../../utility/base";
import { BASE_URL } from "../../utility/base_url";

const UpdateBooking = () => {
    const {bid} = useParams();

    const [requested_for, setRequestedFor] = useState();
    const [start_time, setStartTime] = useState();
    const [end_time, setEndTime] = useState();
    const [total_seats, setTotalSeats] = useState();
    const [user, setUser] = useState(localStorage.getItem('userId'));

    useEffect(() => {
        const get_url = BASE_URL + `/booking/${bid}`
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            const data = result.data
            const st_time = new Date(data.start_time)
            const en_time = new Date(data.end_time)
            let modified_st_hour = (st_time.getHours()<10?'0':'') + st_time.getHours()
            let modified_st_min = (st_time.getMinutes()<10?'0':'') + st_time.getMinutes()
            
            let modified_en_hour = (en_time.getHours()<10?'0':'') + en_time.getHours()
            let modified_en_min = (en_time.getMinutes()<10?'0':'') + en_time.getMinutes()

            setStartTime(modified_st_hour+":"+modified_st_min)
            setEndTime(modified_en_hour+":"+modified_en_min)
            setRequestedFor(data.requested_for.split('T')[0])
            setTotalSeats(data.total_seats)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const goBack = () => {
        window.history.back()
    }

    const reserveClick = (e) => {
        e.preventDefault()
        let modified_st = requested_for+"T"+start_time
        let modified_et = requested_for+"T"+end_time
        const bookingData = {
            requested_for, 
            start_time: modified_st, 
            end_time: modified_et, 
            total_seats,
            user
        }
        let submit_url = BASE_URL + `/update/booking/${bid}`

        axios.put(submit_url, bookingData, getAxiosConfig())
        .then(result => {
            if (result.data.success) {
                document.getElementById("BookingForm").reset();
                toast.success(result.data.message, {
                    hideProgressBar: true
                });
                goBack()
                
                
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

    return(
        <div className="my-5 pt-5">
            <div className="row">
                <div className="col-lg-7 px-4 mx-auto">
                    <div className="card add-item-card p-3">
                        <div className="card-body">
                            <div className="row">
                                    <h3 className="text-center text-uppercase text-primary mb-4">Update Booking</h3>
                                    <form id="BookingForm" className="text-dark">
                                        <div class="mb-3 form-group">
                                            <label className="mb-1 fw-bold">Booking For</label>
                                            <input type="date" class="form-control p-4" placeholder="Date"
                                            value={requested_for}
                                            onChange={(e) => setRequestedFor(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3 form-group row">
                                            <div className='col-md-6'>
                                                <label className="mb-1 fw-bold">Start Time</label>
                                                <input type="time" className='form-control'
                                                value={start_time}
                                                onChange={(e) => setStartTime(e.target.value)}/>
                                            </div>
                                            <div className='col-md-6'>
                                                <label className="mb-1 fw-bold">End Time</label>
                                                <input type="time" className='form-control'
                                                value={end_time}
                                                onChange={(e) => setEndTime(e.target.value)}/>
                                            </div>
                                            
                                        </div>
                                        
                                        <div class="mb-3 form-group">
                                            <label className="mb-1 fw-bold">Total Seats</label>
                                            <input type="number" class="form-control p-4" placeholder="Total Seats"
                                            value={total_seats}
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
    )
}

export default UpdateBooking
