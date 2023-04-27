import { UserContext, UserTypeContext } from "../App";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const {state, dispatch} = useContext(UserContext);
    const {state2, dispatch2} = useContext(UserTypeContext);
    const navigate = useNavigate();
    localStorage.clear()
    dispatch({type: 'USER', payload: false})
    dispatch2({type: 'USERTYPE', payload: ''})
    useEffect(() => {
        navigate('/login')
    }, [])
    return null
    
}

export default Logout