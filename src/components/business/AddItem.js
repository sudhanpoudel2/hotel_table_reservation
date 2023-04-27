import axios from "axios";
import { useEffect, useState } from "react"
import { getAxiosConfig } from "../../utility/base";
import { BASE_URL } from "../../utility/base_url";
import { Link, useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { toast } from "react-toastify";

let category_options = [];
const AddItem = () => {
    const [pimage, setPimage] = useState('');
    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [categories, setSelected] = useState([]);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

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

    const itemSubmit = (e) => {
        e.preventDefault()
        const itemData = new FormData();
        let category_list = []
        categories.map(cat => {
            category_list.push(cat.value)
        })
        
        itemData.append('name', name);
        itemData.append('description', description);
        itemData.append('categories', JSON.stringify(category_list));
        itemData.append('price', price);
        itemData.append('images', pimage);
        itemData.append('itemOf', userId);

        axios.post(BASE_URL + '/item/add', itemData, getAxiosConfig())
        .then(result => {
            if (result.data.success) {
                document.getElementById("ItemAddForm").reset();
                setSelected([])
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
        })

    }

    const categoryClick = (e) => {
        navigate('/add-category')
    }

    return(
        
        <div className="container my-5 pt-5">
            <div className="row">
                <div className="col-sm-9 col-md-8 col-lg-6 mx-auto">
                    <div className="card add-item-card my-5">
                        <div className="card-body px-md-5 py-3 form-text">
                            <h3 className="text-center text-uppercase text-primary mb-4">Add Item</h3>
                            <form id="ItemAddForm" className="text-dark">
                                <div class="mb-3 form-group">
                                    <label className="mb-1 fw-bold">Name</label>
                                    <input type="text" class="form-control p-4" placeholder="Item Name"
                                    onChange={(e)=>setName(e.target.value)}/>
                                </div>
                                <div className="text-center">
                                    <button type="button" className="btn btn-sm text-primary fw-bold p-0" onClick={categoryClick}>Category <i class="fas fa-plus ms-1"></i></button>

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
                                    onChange={(e)=>setPrice(e.target.value)}/>
                                </div>
                                <div class="mb-3 form-group">
                                    <label className="mb-1 fw-bold">Description</label>
                                    <textarea class="form-control px-4" rows="5" placeholder="Item Description" onChange={(e)=>setDesc(e.target.value)}></textarea>
                                    {/* <input type="text" class="form-control p-4" placeholder="Item Description"
                                    onChange={(e)=>setTableNo(e.target.value)}/> */}
                                </div>
                                <div class="mb-3 form-group">
                                    <label className="mb-1 fw-bold">Image</label>
                                    <div>
                                    <input type="file" id="file-upload" 
                                    onChange={(e)=>setPimage(e.target.files[0])}
                                    />
                                    </div>
                                    
                                </div>
                                <div class="mb-3">
                                    <button type="submit" class="btn btn-primary w-100" onClick={itemSubmit}>Submit <i class="far fa-check-square ms-2"></i></button>
                                </div>
                            </form>
                            <hr className="text-dark"/>
                            <div className='d-flex justify-content-center form-text'>
                                <h6 className='fw-bold text-dark me-2'>View Your items?</h6>
                                <h6 className="text-dark">
                                    <Link to="/my-items">
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

export default AddItem
