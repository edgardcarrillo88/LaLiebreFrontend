import Link from "next/link";
import style from "../styles/navbar.module.css"
import { useEffect, useState } from 'react';
import axios from "axios";
import Cookie from 'js-cookie'
import { useRouter } from "next/router";

export default function Menu() {


    const [user, setUser] = useState({
        email: '',
        username: ''
    })

    const router = useRouter();

    // useEffect(() => {
    //     async function getprofile() {
    //         try {
    //             console.log("profile de navbar");
    //             const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`)
    //             console.log(response);
    //             setUser(response.data)
    //         } catch (error) {
    //             if (error.response && error.response.status === 401) {
    //                 setUser(null);
    //                 console.log(!user);
    //             }
    //         }
    //     }
    //     getprofile();
    // }, [])


    const logoutProfile = () =>{
        Cookie.set('MyTokenName', null, {
            expires: 0, // Expires in 30 days
            path: '/',    // Set the path to '/'
          });
      
          router.push("/");
    }

    return (
        <nav className={style.navbar}>
            <div className={style.mobilemenu}>&#9776;</div>
            <div className={style.navbaroption}>
                <Link className={style.linkoption} href="/register">Registrar productos</Link>
                <Link className={style.linkoption} href="/review">Revision de stock</Link>
                <Link className={style.linkoption} href="/dashboard">Dashboard</Link>
                <Link className={style.linkoption} href="/delivery">Delivery</Link>
            <div className={style.loginoption}>
                {!user && <Link className={style.linkoption} href="/login">Login</Link>}
                {user && <Link className={style.linkoption} href="/login" onClick={() => logoutProfile()}>LogOut</Link>}
                {/* <Link className={style.linkoption} href="/login">Login</Link> */}
            </div>
            </div>
        </nav>
    )
}

