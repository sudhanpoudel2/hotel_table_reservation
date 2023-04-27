import { useRef, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { closeSwal, fireSwal, getAxiosConfig } from "../../utility/base";
import { BASE_URL } from "../../utility/base_url";
import axios from "axios";
import { toast } from "react-toastify";


const CategoryList = () => {
    const [cdata, setCdata] = useState([]);
    const navigate = useNavigate();
    const del_ref = useRef();

    useEffect(() => {
        const get_url = BASE_URL + '/all-categories/'
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            setCdata(result.data)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const redirectToForm = (e) => {
        e.preventDefault()
        const cid = e.target.getAttribute('data-category-id')
        navigate(`/admin/update-category/${cid}`)
    }

    const deleteCategory = (e) => {
        const cid = e.target.getAttribute('data-category-id')
        const data_submit_url = BASE_URL + `/category/delete/${cid}`

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
            title: "Delete Category",
            html: form_elem,
            showConfirmButton: false
        }
        fireSwal(swal_config)
    }

    const delSubmit = (e) => {
        e.preventDefault()
        let del_url = e.target.getAttribute('data-submit-url')
        console.log(del_url)
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
        <div className="pt-4 my-5">
            <section className="container-fluid bg-secondary">
                <div className="text-center py-3">
                    <p className="fs-1 fw-bold">Categories</p>
                    <p class="fst-italic">Here are the list of categories that are present in the platform.</p>
                    <Link to='/admin/add-category'>
                        <a className="btn btn-primary" href="#">Add Category</a>
                    </Link>
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
                                        <th>Category Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {cdata.map((category, index) => {
                                        return(
                                            <>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{category.name}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-center buttonsList">
                                                            <button className="btn btn-sm btn-outline-primary me-2" data-tooltip="Update" data-category-id={category._id} onClick={redirectToForm}><i class="far fa-edit" data-category-id={category._id}></i></button>
                                                            <button className="btn btn-sm btn-outline-danger" data-tooltip="Delete" data-category-id={category._id} onClick={deleteCategory}><i class="far fa-trash-alt" data-category-id={category._id}></i></button>
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

export default CategoryList