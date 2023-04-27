import { Link } from "react-router-dom"
import { fireSwal, getAxiosConfig } from "../../utility/base"
import { useEffect, useRef, useState, } from "react"
import axios from "axios"
import { BASE_URL } from "../../utility/base_url"
import { useNavigate } from "react-router-dom"
import { closeSwal } from "../../utility/base"
import { toast } from "react-toastify"

const MyTables = () => {
    const [tdata, setTdata] = useState([])
    const navigate = useNavigate();
    const del_ref = useRef(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        const get_url = BASE_URL + `/table/user/${userId}`
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            setTdata(result.data)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const redirectToForm = (e) => {
        e.preventDefault()
        const tid = e.target.getAttribute('data-table-id')
        navigate(`/my-tables/update/${tid}`)
    }


    const deleteTable = (e) => {
        const tid = e.target.getAttribute('data-table-id')
        const data_submit_url = BASE_URL + `/table/delete/${tid}`

        const form_elem = del_ref.current
        form_elem.addEventListener('submit', delTable)
        form_elem.setAttribute('data-submit-url', data_submit_url)

        var buttons = form_elem.elements
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].nodeName === "BUTTON" && buttons[i].type === "button") {
              buttons[i].addEventListener('click', closeSwal);
            }
        }
        
        let swal_config = {
            title: "Delete Table",
            html: form_elem,
            showConfirmButton: false
        }
        fireSwal(swal_config)
    }

    const delTable = (e) => {
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
                    <p className="fs-1 fw-bold">My Tables</p>
                    <p class="fst-italic">Here are the list of tables that were added by you.</p>
                    <Link to='/table-add'>
                    <a className="btn btn-primary" href="#">Add Tables</a>
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
                                        <th>Table Number</th>
                                        <th>Minimum Capacity</th>
                                        <th>Maximum Capacity</th>
                                        <th>Is Available</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {tdata.map((table, index) => {
                                        return(
                                            <>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{table.table_number}</td>
                                                    <td>{table.min_capacity}</td>
                                                    <td>{table.max_capacity}</td>
                                                    <td className="text-capitalize">{table.isAvailable.toString()}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-center buttonsList">
                                                            <button className="btn btn-sm btn-outline-primary me-2" data-tooltip="Update" data-table-id={table._id} onClick={redirectToForm}><i class="far fa-edit" data-table-id={table._id}></i></button>
                                                            <button className="btn btn-sm btn-outline-danger" data-tooltip="Delete" data-table-id={table._id} onClick={deleteTable}><i class="far fa-trash-alt" data-table-id={table._id}></i></button>
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

export default MyTables