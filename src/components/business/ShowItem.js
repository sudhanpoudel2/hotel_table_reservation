import { BASE_URL } from "../../utility/base_url"
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { getAxiosConfig } from "../../utility/base"
import { useNavigate } from "react-router-dom"
import { closeSwal } from "../../utility/base"
import { toast } from "react-toastify"
import { fireSwal } from "../../utility/base"
import empty from "../../images/empty.svg"

const ShowItem = () => {
    const [idata, setIdata] = useState([]);
    const navigate = useNavigate();
    const delRef = useRef(null)

    useEffect(() => {
        const get_url = BASE_URL + '/my-items/'
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            setIdata(result.data)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const redirectToForm = (e) => {
        e.preventDefault()
        const iid = e.target.getAttribute('data-item-id')
        navigate(`/my-items/update/${iid}`)
    }


    const deleteItem = (e) => {
        const iid = e.target.getAttribute('data-item-id')
        const data_submit_url = BASE_URL + `/item/delete/${iid}`

        const form_elem = delRef.current
        form_elem.addEventListener('submit', delSubmit)
        form_elem.setAttribute('data-submit-url', data_submit_url)

        var buttons = form_elem.elements
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].nodeName === "BUTTON" && buttons[i].type === "button") {
              buttons[i].addEventListener('click', closeSwal);
            }
        }
        
        let swal_config = {
            title: "Delete Item",
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

    return (
        <div className="my-5 pt-4">
            <section className="container-fluid bg-secondary">
                <div className="text-center py-3">
                    <p className="fs-1 fw-bold">My Items</p>
                    <p class="fst-italic">Here are the list of items that were added by you.</p>
                    <Link to='/add-item'>
                        <a className="btn btn-primary" href="#">Add Item</a>
                    </Link>
                </div>
            </section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-10 mx-auto py-4">
                        <div className="row">
                            {idata.map((item, index) => {
                                return(
                                    <div className="col-md-6 col-lg-4">
                                        <div className="card menu-card d-flex mb-4">
                                            <div className="card-body">
                                                <div className="menu-thumbnail mb-2">
                                                    {
                                                        item.images !== '' ? 
                                                        <img src={BASE_URL + `/${item.images}`} className="img-fluid rounded"/> : 
                                                        <img src={empty} className="img-fluid rounded"/>
                                                    }
                                                    
                                                </div>
                                                <p className="text-center h4 text-dark mb-3">{item.name}</p>
                                                <div className="scrollmenu mb-3">
                                                    {item.category_info.map(category => {
                                                        return(
                                                            <button type="button" className="btn btn-primary px-3 py-0 me-2">{category.name}</button>
                                                        )
                                                    })}
                                                </div>
                                                <p>
                                                    {item.description}
                                                </p>
                                                <div className="d-flex justify-content-end">
                                                    <strong>Nrs. </strong>{item.price}
                                                </div>
                                                <div className="d-flex justify-content-center buttonsList">
                                                    <button type="button" className="btn btn-sm btn-outline-primary me-2" data-tooltip="Update" data-item-id={item._id} onClick={redirectToForm}><i class="far fa-edit" data-item-id={item._id}></i></button>
                                                    <button type="button" className="btn btn-sm btn-outline-danger" data-tooltip="Delete" data-item-id={item._id} onClick={deleteItem}><i class="far fa-trash-alt" data-item-id={item._id}></i></button>
                                                </div>

                                            </div>
                                            

                                        </div>

                                    </div>
                                )
                            })}
                            

                        </div>
                    </div>
                </div>
                

            </div>
            <div className="d-none">
                <form ref={delRef}>
                    <p>Are you sure you want to delete this?</p>
                    <hr/>
                    <div className="d-flex justify-content-center buttonsList">
                        <button type="submit" className="btn btn-outline-primary me-3">Yes</button>
                        <button type="button" className="btn btn-outline-danger me-3 close-btn" onClick={closeSwal}>No</button>
                    </div>
                    
                </form>

            </div>
            {/* <p><img src={BASE_URL+'/1643866267811ARTICLE 1.jpg'} className="img-fluid"  /></p> */}
        </div>
    )
}

export default ShowItem