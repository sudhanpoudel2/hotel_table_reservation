const isAuthenticated = localStorage.getItem("isAuthenticated")
const user_type = localStorage.getItem("user_type")
export const initialState = {"isAuthenticated": isAuthenticated, "user_type": user_type};

export const reducer = (state, action) => {
    if (action.type === 'USER') {
        return action.payload;
    }
    return state;
}

export const userTypeReducer = (state, action) => {
    if (action.type === 'USERTYPE') {
        return action.payload;
    }
    return state;
}
