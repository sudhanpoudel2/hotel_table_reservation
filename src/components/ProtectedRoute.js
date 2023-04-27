import { Navigate } from "react-router-dom";


function PrivateRoute({ children }) {
    var isAuth;
    if(localStorage.getItem('isAuthenticated')){
        isAuth= true
    }
    else{
        isAuth= false
    }
    return isAuth ? children : <Navigate to="/login" />;
}

export function AdmminRoute({children}) {
    var isAuth;
    if(localStorage.getItem('isAuthenticated')){
        if(localStorage.getItem('user_type') == 'Admin') {
            isAuth = true
        }
    }
    else{
        isAuth= false
    }
    return isAuth ? children : <Navigate to="/login" />;
}

export function CustomerRoute({children}) {
    var isAuth;
    if(localStorage.getItem('isAuthenticated')){
        if(localStorage.getItem('user_type') == 'Customer') {
            isAuth = true
        }
    }
    else{
        isAuth= false
    }
    return isAuth ? children : <Navigate to="/login" />;
}

export function BusinessRoute({children}) {
    var isAuth;
    if(localStorage.getItem('isAuthenticated')){
        if(localStorage.getItem('user_type') == 'Business') {
            isAuth = true
        }
    }
    else{
        isAuth= false
    }
    return isAuth ? children : <Navigate to="/login" />;
}

export const AuthenticatedRoute = ({children}) => {
    if(localStorage.getItem('isAuthenticated')){
        return <Navigate to='/home' />
    } else {
        return children
    }
}

export default PrivateRoute;