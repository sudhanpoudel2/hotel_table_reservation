import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios";
import { getAxiosConfig } from "../../utility/base";
import { BASE_URL } from "../../utility/base_url";
import { toast } from "react-toastify";

const BulkTableAdd = () => {
    const [min_capacity, setMinCapacity] = useState('');
    const [max_capacity, setMaxCapacity] = useState('');
    const [table_number, setTableNo] = useState('');
    const [tableOf, setTableOf] = useState(localStorage.getItem('userId'))

    const tableSubmit = (e) => {
        e.preventDefault()
        const table_list = table_number.split(",")
        let validated = true;
        let check_number;
        table_list.forEach((num) => {
            if (isNaN(Number(num))) {
                validated = false;
            }
        })

        if (validated) {
            const tableData = {min_capacity, max_capacity, table_number, tableOf};
            const submit_url = BASE_URL+"/table/bulk/add"

            axios.post(submit_url, tableData, getAxiosConfig())
            .then(result => {
                if (result.data.success) {
                    document.getElementById("TableAddForm").reset();
                    toast.success(result.data.message, {
                        hideProgressBar: true
                    });
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

        } else {
            toast.error("Invalid table number", {
                hideProgressBar: true
            });
        }
        
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
                                    <div className="form-group text-dark text-start">
                                        <label className="fw-bold">Minimum Capacity</label>
                                        <input type="number" class="form-control p-4" placeholder="Minimum Capacity"
                                        onChange={(e)=>setMinCapacity(e.target.value)}/>
                                    </div>
                                    
                                </div>
                                <div class="mb-3">
                                    <div className="form-group text-dark text-start">
                                        <label className="fw-bold">Maximum Capacity</label>
                                        <input type="number" class="form-control p-4" placeholder="Maximum Capacity"
                                        onChange={(e)=>setMaxCapacity(e.target.value)}/>
                                    </div>
                                    
                                </div>
                                <div class="mb-3">
                                    <div className="form-group text-dark text-start">
                                        <label className="fw-bold">Table Numbers</label> <br/>
                                        <input type="text" class="form-control p-4" placeholder="Comma Separated Table Numbers"
                                        onChange={(e)=>setTableNo(e.target.value)}/>
                                        <em>Note: Separate table numbers by a comma</em>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <button type="submit" class="btn btn-primary w-100" onClick={tableSubmit}>Submit <i class="far fa-check-square ms-2"></i></button>
                                </div>
                            </form>
                            <hr className="text-dark"/>
                            <div className='d-flex justify-content-center form-text'>
                                <h6 className='fw-bold text-dark me-2'>Go back?</h6>
                                <h6 className="text-dark">
                                    <Link to="/table-add">
                                        <span className='text-primary'> <i class="fas fa-hand-point-left"></i></span>
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

export default BulkTableAdd