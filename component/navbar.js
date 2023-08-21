import Link from "next/link";
import style from "../styles/navbar.module.css"
import { useEffect, useState } from 'react';
import axios from "axios";

export default function Menu() {


    const [user, setUser] = useState({
        email: '',
        username: ''
    })


    useEffect(() => {
        async function getprofile() {
            try {
                const response = await axios.get('/api/profile')
                setUser(response.data)
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setUser(null);
                    console.log(!user);
                }
            }
        }
        getprofile();
    }, [])


    return (
        <nav className={style.navbar}>
            <div className={style.mobilemenu}>&#9776;</div>
            <div className={style.navbaroption}>
                <Link className={style.linkoption} href="/register">Registrar productos</Link>
                <Link className={style.linkoption} href="/review">Revision de stock</Link>
                <Link className={style.linkoption} href="/dashboard">Dashboard</Link>
            <div className={style.loginoption}>
                {!user && <Link className={style.linkoption} href="/login">Login</Link>}
                {user && <Link className={style.linkoption} href="/login" onClick={() => logoutProfile()}>LogOut</Link>}
                {/* <Link className={style.linkoption} href="/login">Login</Link> */}
            </div>
            </div>
        </nav>
    )
}

