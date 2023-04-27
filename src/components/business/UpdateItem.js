import { useState, useEffect } from "react"
import axios from "axios";
import { getAxiosConfig } from "../../utility/base";
import { MultiSelect } from "react-multi-select-component";
import { BASE_URL } from "../../utility/base_url";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import empty from '../../images/empty.svg'

let category_options = []
const UpdateItem = () => {
    const {iid} = useParams();

    const [pimage, setPimage] = useState('');
    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [price, setPrice] = useState(0);
    const [categories, setSelected] = useState([]);
    const [currentImage, setCurrentImage] = useState('');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();


    useEffect(() => {
        const get_url = BASE_URL + `/items/${iid}`
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            let selectedCatValues = []
            const data = result.data
            setCurrentImage(data.images)
            setName(data.name)
            setDesc(data.description)
            setPrice(parseFloat(data.price))
            data.category_info.map(cat => {
                selectedCatValues.push(
                    { label: `${cat.name}`, value: `${cat._id}` }
                )
            })
            setSelected(selectedCatValues)
            
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    useEffect(() => {
        const get_url = BASE_URL + '/all-categories'
        category_options = []
        axios.get(get_url, getAxiosConfig())
        .then(result => {
            const data = result.data             
            data.map(cat => {
                category_options.push(
                    { label: `${cat.name}`, value: `${cat._id}` }
                )
            })
            
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const itemUpdate = (e) => {
        e.preventDefault()
        let category_list = []
        categories.map(cat => {
            category_list.push(cat.value)
        })

        const itemData = {name, categories: category_list, price, description}
        axios.put(BASE_URL + `/item/update/${iid}`, itemData, getAxiosConfig())
        .then(result => {
            if (result.data.success) {
                toast.success(result.data.message, {
                    hideProgressBar: true
                });
                navigate('/my-items')
            } else {
                toast.error(result.data.message, {
                    hideProgressBar: true
                });
            }
        })
        .catch(e => {
            console.log(e)
        })
    }

    const replaceImage = (e) => {
        e.preventDefault()
        if (pimage === '') {
            toast.error('Please select an image first', {
                hideProgressBar: true
            });
        } else {
            const itemData = new FormData()
            itemData.append('image', pimage);
            axios.put(BASE_URL + `/item/${iid}/add-item-image`, itemData, getAxiosConfig())
            .then(result => {
                if (result.data.success) {
                    toast.success(result.data.message, {
                        hideProgressBar: true
                    });
                    navigate('/my-items')
                } else {
                    toast.error(result.data.message, {
                        hideProgressBar: true
                    });
                }
            })
            .catch(e => {
                console.log(e)
            })
        }
        
    }

    const removeImage = (e) => {
        e.preventDefault()
        axios.put(BASE_URL + `/item/${iid}/remove-image`, {}, getAxiosConfig())
        .then(result => {
            if (result.data.success) {
                toast.success(result.data.message, {
                    hideProgressBar: true
                });
                navigate('/my-items')
            } else {
                toast.error(result.data.message, {
                    hideProgressBar: true
                });
            }
        })
        .catch(e => {
            console.log(e)
        })
    }

    return(
        <div className="container my-5 pt-5">
            <div className="row">
                <div className="col-sm-12 col-lg-10 mx-auto">
                    <div className="card add-item-card my-5">
                        <div className="card-body px-md-5 py-3 form-text">
                            <div className="row">
                                <div className="col-lg-4 pt-lg-5 updateFormContainer">
                                    <div className=' form-text my-3'>
                                        <div class="mb-3 form-group">
                                            <form className="text-dark">
                                                <label className="mb-1 fw-bold">Image</label>
                                                <div>
                                                    <input type="file" id="file-upload" 
                                                    onChange={(e)=>setPimage(e.target.files[0])}
                                                    />
                                                </div>
                                                <label className="mb-1 fw-bold">Current: </label>
                                                {
                                                    currentImage !== '' ? 
                                                    <img src={BASE_URL + `/${currentImage}`} alt="Item image" className="img-fluid rounded" /> : 
                                                    <img src={empty} alt="Empty image" className="img-fluid rounded" />
                                                }
                                                <div className="d-flex justify-content-center buttonsList mt-3">
                                                    <button type="button" className="btn btn-sm btn-outline-primary me-2" data-tooltip="Update" data-item-id="" onClick={replaceImage}><i class="far fa-edit" data-item-id=""></i> Replace</button>
                                                    <button type="button" className="btn btn-sm btn-outline-danger" data-tooltip="Delete" data-item-id="" onClick={removeImage}><i class="far fa-trash-alt" data-item-id=""></i> Remove</button>
                                                </div>
                                            </form>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 ">
                                    <h3 className="text-center text-uppercase text-primary mb-4">Update Item</h3>
                                    <form id="ItemAddForm" className="text-dark">
                                        <div class="mb-3 form-group">
                                            <label className="mb-1 fw-bold">Name</label>
                                            <input type="text" class="form-control p-4" placeholder="Item Name"
                                            value={name}
                                            onChange={(e)=>setName(e.target.value)}/>
                                        </div>
                                        <div className="mb-3 form-group">
                                            <label className="mb-1 fw-bold">Categories</label>
                                            <MultiSelect
                                                options={category_options}
                                                value={categories}
                                                onChange={setSelected}
                                                labelledBy="Select"
                                                hasSelectAll={false}
                                            />
                                        </div>
                                        
                                        <div class="mb-3 form-group">
                                            <label className="mb-1 fw-bold">Price</label>
                                            <input type="number" class="form-control p-4" placeholder="Item Price"
                                            value={price}
                                            onChange={(e)=>setPrice(e.target.value)}/>
                                        </div>
                                        <div class="mb-3 form-group">
                                            <label className="mb-1 fw-bold">Description</label>
                                            <textarea class="form-control px-4" rows="5" placeholder="Item Description" onChange={(e)=>setDesc(e.target.value)} value={description}></textarea>
                                        </div>
                                        
                                        <div class="mb-3">
                                            <button type="submit" class="btn btn-primary w-100" onClick={itemUpdate}>Submit <i class="far fa-check-square ms-2"></i></button>
                                        </div>
                                    </form>

                                </div>

                            </div>
                            
                            
                            {/* <hr className="text-dark"/>
                            <div className='d-flex justify-content-start form-text'>
                                <div class="mb-3 form-group">
                                    <form className="text-dark">
                                        <label className="mb-1 fw-bold">Image</label>
                                        <div>
                                            <input type="file" id="file-upload" 
                                            onChange={(e)=>setPimage(e.target.files[0])}
                                            />
                                        </div>
                                        <label className="mb-1 fw-bold">Current: </label>
                                        {
                                            currentImage !== '' ? 
                                            <img src={BASE_URL + `/${currentImage}`} alt="Item image" className="img-fluid rounded" /> : 
                                            <img src={empty} alt="Empty image" className="img-fluid rounded" />
                                        }
                                        <div className="d-flex justify-content-center buttonsList mt-3">
                                            <button type="button" className="btn btn-sm btn-outline-primary me-2" data-tooltip="Update" data-item-id="" onClick={replaceImage}><i class="far fa-edit" data-item-id=""></i> Replace</button>
                                            <button type="button" className="btn btn-sm btn-outline-danger" data-tooltip="Delete" data-item-id="" onClick={removeImage}><i class="far fa-trash-alt" data-item-id=""></i> Remove</button>
                                        </div>
                                    </form>
                                    
                                    
                                </div>
                            </div> */}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UpdateItem