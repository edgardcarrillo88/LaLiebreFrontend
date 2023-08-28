import Navbar from '../component/navbar'
import axios from 'axios'

export default function dashboard() {

    const getprofile = async ()=>{
        const response = axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`,{withCredentials:true})
        console.log(response.data);
    }

    return(
        <>
            <Navbar/>
            <h1>dashboard</h1>
            <button  onClick={getprofile}>
              get profile
            </button>
        </>
    )
    }
