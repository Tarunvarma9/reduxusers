import React, { useState,useEffect } from 'react';
import {store,getUsers} from './redux_users'

const Users=()=>{
    const[users,setUsers]=useState([]);
    const [loading,setLoading]=useState(true);
    const[error,setError]=useState(false);


    useEffect(()=>{
        store.subscribe(()=>{
            var state=store.getState();
            setUsers(state.users);
            setLoading(state.loading);
            setError(state.error);
                })
                store.dispatch(getUsers());
    },[])
    if(loading){
        return<div>
            <h1>Users</h1>
            <p>Loading..Please Wait</p>
        </div>
    }
    if(error){
        return <div>
            <h1>Users</h1>
            <p>Sorry.. Server is down. Come back later</p>
        </div>
    }

    return <div>
        <h1>Users</h1>
        {
            users.map((user)=>{
                return <li key={user.id}>{user.name}</li>
            })
        }
    </div>

}
export default Users;