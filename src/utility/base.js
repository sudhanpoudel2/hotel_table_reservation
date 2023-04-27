import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const MySwal = withReactContent(Swal);

export const getAxiosConfig = () => {
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return config
}

export const fireSwal = (swalConfig) => {
    MySwal.fire({
        title: <p>Hello World</p>,
        footer: 'Copyright 2018',
        didOpen: () => {
        // `MySwal` is a subclass of `Swal`
        //   with all the same instance & static methods
        MySwal.clickConfirm()
        }
    }).then(() => {
        return MySwal.fire(swalConfig)
    })
}

export const closeSwal = () => {
    MySwal.close()
}

