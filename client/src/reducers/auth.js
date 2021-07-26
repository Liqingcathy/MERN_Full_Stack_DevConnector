/**
 * Reducers to manipulate store changes
 */
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types';

//default token: get token from local storage
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}


export default function functionName(state = initialState, action){
    const { type, payload } = action;

    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:    
            localStorage.setItem('token', payload.token);
            return {
                ...state, //current state
                ...payload,
                isAuthenticated: true,
                loading: false
            };

        //clear everything from local storage    
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:    
        case LOGOUT:
           localStorage.removeItem('token');
           return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
            };
        default:
            return state;
    }
}

