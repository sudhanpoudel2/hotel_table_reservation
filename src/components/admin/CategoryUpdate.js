import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utility/base_url";
import { getAxiosConfig } from "../../utility/base";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryUpdate = () => {
    const {cid} = useParams();

    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const get_url = BASE_URL + `/category/${cid}`
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            const data = result.data 
            setName(data.name)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const updateCategory = (e) => {
        e.preventDefault();
        const cdata = {name}
        let put_url = BASE_URL + `/category/update/${cid}`
        axios.put(put_url, cdata, getAxiosConfig())
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
        navigate('/category-list')
    }

    return(
        <div className="container my-5 pt-5">
            <div className="card col-md-8 mx-auto">
                <div className="card-body">
                    <h2 className="text-center">Update Category</h2>
                    <form id="CategoryUpdateForm" onSubmit={updateCategory}>
                        <div class="mb-3">
                            <div className="form-group text-dark text-start fw-bold">
                            <label className="mb-3">Name</label>
                                <input type="text" class="form-control p-4" placeholder="Category Name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            
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

export default CategoryUpdate