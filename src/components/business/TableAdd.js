import { Link } from "react-router-dom"
import { useState } from "react"
import { BASE_URL } from "../../utility/base_url";
import { toast } from "react-toastify";
import axios from "axios";
import { getAxiosConfig } from "../../utility/base";

const TableAdd = () => {
    const [min_capacity, setMinCapacity] = useState('');
    const [max_capacity, setMaxCapacity] = useState('');
    const [table_number, setTableNo] = useState('');
    const [tableOf, setTableOf] = useState(localStorage.getItem('userId'));

    const tableSubmit = (e) => {
        e.preventDefault()
        
        
        const tableData = {min_capacity, max_capacity, table_number, tableOf};
        const submit_url = BASE_URL+"/table/add"

        axios.post(submit_url, tableData, getAxiosConfig())
        .then(result => {
            if (result.data.success) {
                document.getElementById("TableAddForm").reset();
                toast.success(result.data.message, {
                    hideProgressBar: true
                });
                // setTimeout(() => {
                //     navigate('/login')
                // }, 1500)
                
                
            } else {
                toast.error(result.data, {
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
        <div className="container my-5 pt-5">
            <div className="row">
                <div className="col-sm-9 col-md-8 col-lg-6 mx-auto">
                    <div className="card add-table-card my-5">
                        <div className="card-body px-md-5 py-3 form-text">
                            <h3 className="text-center text-uppercase text-primary mb-4">Add Table</h3>
                            <form id="TableAddForm">
                                <div class="mb-3">
                                    <input type="number" class="form-control p-4" placeholder="Minimum Capacity"
                                    onChange={(e)=>setMinCapacity(e.target.value)}/>
                                </div>
                                <div class="mb-3">
                                    <input type="number" class="form-control p-4" placeholder="Maximum Capacity"
                                    onChange={(e)=>setMaxCapacity(e.target.value)}/>
                                </div>
                                <div class="mb-3">
                                    <input type="number" class="form-control p-4" placeholder="Table Number"
                                    onChange={(e)=>setTableNo(e.target.value)}/>
                                </div>
                                <div class="mb-3">
                                    <button type="submit" class="btn btn-primary w-100" onClick={tableSubmit}>Submit <i class="far fa-check-square ms-2"></i></button>
                                </div>
                            </form>
                            <hr className="text-dark"/>
                            <div className='d-flex justify-content-center form-text'>
                                <h6 className='fw-bold text-dark me-2'>Add multiple table at once?</h6>
                                <h6 className="text-dark">
                                    <Link to="/bulk-table-add">
                                        <span className='text-primary'> <i class="fas fa-hand-point-right"></i></span>
                                    </Link>
                                </h6>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TableAdd