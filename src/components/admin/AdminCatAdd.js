import { useState } from "react"
import axios from "axios";
import { BASE_URL } from "../../utility/base_url";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAxiosConfig } from "../../utility/base";

const AdminCatAdd = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate()

    const categorySubmit = (e) => {
        e.preventDefault()
        const catData = {name}
        let add_url = BASE_URL + '/category/add'
        axios.post(add_url, catData, getAxiosConfig())
        .then(result => {
            if (result.data.success) {
                document.getElementById("CategoryForm").reset();
                toast.success(result.data.message, {
                    hideProgressBar: true
                });
            } else {
                toast.error(result.data.message, {
                    hideProgressBar: true
                });
            }
            
        })
        .catch(e => {
            console.log(e)
            toast.error('Unable to Add', {
                hideProgressBar: true
            });
        })
    }

    const goBack = () => {
        navigate('/add-item')
    }

    return(
        <div className="container my-5 pt-5">
            <div className="row">
                <div className="col-lg-7 col-md-8 col-sm-9 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-dark text-center">Add Category</h3>
                            <form id="CategoryForm" onSubmit={categorySubmit}>
                                <div className="mb-3 form-group">
                                    <lable className="mb-2 d-block text-start fw-bold">Category Name</lable>
                                    <input type="text" 
                                    class="form-control p-4" 
                                    placeholder="Category Name"
                                    onChange={(e)=>setName(e.target.value)}/>

                                </div>
                                <div class="row mb-3">
                                    <div className="col-md-12 mb-2 text-center">
                                        <button type="submit" class="btn btn-primary">Submit <i class="far fa-check-square ms-2"></i></button>
                                    </div>
                                </div>
                                
                            </form>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AdminCatAdd