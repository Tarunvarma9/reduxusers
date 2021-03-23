import {createStore,applyMiddleware} from 'redux';

import logger from 'redux-logger'
import thunk from 'redux-thunk'


const GETUSERS_STARTED='GETUSERS_STARTED'
const GETUSERS_SUCCESS='GETUSERS_SUCCESS'
const GETUSERS_FAILED='GETUSERS_FAILED'
export const getUsersStarted=()=>{
    return {
        type:GETUSERS_STARTED
    }
}

export const getUsersSuccess=(users)=>{
    return {
        type:GETUSERS_SUCCESS,
        users
    }
}

export const getUsersFailed=(error)=>{
    return {
        type:GETUSERS_FAILED,
        error
    }
}

export const getUsers=()=>{
    return (dispatch)=>{
        dispatch(getUsersStarted());
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response)=>response.json())
        .then((users)=>{
            dispatch(getUsersSuccess(users));
        })
        .catch((error)=>{
            dispatch(getUsersFailed(error))
        })
    }
}
var initialState={
    users:[],
    loading:true,
    error:false
}
const users=(state=initialState,action)=>{
    switch(action.type){
        case GETUSERS_STARTED:
            return{
                users:[],
                loading:true,
                error:false
            }
        case GETUSERS_SUCCESS:
            return{
                ...state,
                users:action.users,
                loading:false

            }
            default:
                return state;    
    }
}
export const store=createStore(users,applyMiddleware(logger,thunk))