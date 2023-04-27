import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utility/base_url";
import { getAxiosConfig } from "../../utility/base";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateTable = () => {
    const {tid} = useParams();

    const [min_capacity, setMinCapacity] = useState(0);
    const [max_capacity, setMaxCapacity] = useState(0);
    const [table_number, setTableNo] = useState(0);
    const [tableOf, setTableOf] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const get_url = BASE_URL + `/table/${tid}`
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            const data = result.data
            const current_user_id = localStorage.getItem('userId')
            setMinCapacity(data.min_capacity)
            setMaxCapacity(data.max_capacity)
            setTableNo(data.table_number)
            setIsAvailable(data.isAvailable)
            setTableOf(current_user_id)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const updateTable = (e) => {
        e.preventDefault();
        const tableData = {min_capacity, max_capacity, table_number, tableOf, isAvailable}
        let put_url = BASE_URL + `/table/update/${tid}`
        axios.put(put_url, tableData, getAxiosConfig())
        .then(result => {
            if (result.data.success) {
                toast.success(result.data.message, {
                    hideProgressBar: true
                });
                goBack();
            } else {
                toast.error(result.data.error, {
                    hideProgressBar: true
                });
            }
        })
        .catch(e => {
            console.log(e)
            toast.success('Unable to update', {
                hideProgressBar: true
            });
        })
    }

    const goBack = () => {
        navigate('/my-tables')
    }

    return(
        <div className="container my-5 pt-5">
            <div className="card col-md-8 mx-auto">
                <div className="card-body">
                    <h2 className="text-center">Update Table</h2>
                    <form id="TableUpdateForm" onSubmit={updateTable}>
                        <div class="mb-3">
                            <div className="form-group text-dark text-start fw-bold">
                            <label className="mb-3">Minimum Capacity</label>
                                <input type="number" class="form-control p-4" placeholder="Minimum Capacity"
                                value={min_capacity}
                                onChange={(e)=>setMinCapacity(e.target.value)}/>
                            </div>
                            
                        </div>
                        <div class="mb-3">
                            <div className="form-group text-dark text-start fw-bold">
                                <label className="mb-3">Maximum Capacity</label>
                                <input type="number" class="form-control p-4" placeholder="Maximum Capacity"
                                value={max_capacity}
                                onChange={(e)=>setMaxCapacity(e.target.value)}/>
                            </div>
                            
                        </div>
                        <div class="mb-3">
                            <div className="form-group text-dark text-start fw-bold">
                                <label className="mb-3">Table Number</label>
                                <input type="number" class="form-control p-4" placeholder="Table Number"
                                value={table_number}
                                onChange={(e)=>setTableNo(e.target.value)}/>
                            </div>
                            
                        </div>
                        <div class="mb-3 d-flex">
                            <label class="me-3 text-dark fw-bold">Is Available:</label>
                            <input class="apple-switch" type="checkbox" id="homepage_display" 
                            checked={isAvailable} 
                            onChange={(e) => setIsAvailable(!isAvailable)}/>
                            
                        </div>

                        <div class="row mb-3">
                            <div className="col-md-6 mb-2">
                                <button type="submit" class="btn btn-primary w-100">Submit <i class="far fa-check-square ms-2"></i></button>
                            </div>
                            <div className="col-md-6">
                                <button type="button" class="btn btn-secondary w-100" onClick={goBack}>Cancel <i class="far fa-times-circle"></i></button>

                            </div>
                            
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default UpdateTable