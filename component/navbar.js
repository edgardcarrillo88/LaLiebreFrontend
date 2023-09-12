import Link from "next/link";
import style from "../styles/navbar.module.css"
import { useEffect, useState } from 'react';
import axios from "axios";
import Cookie from 'js-cookie'
import { useRouter } from "next/router";

export default function Menu() {


    const [user, setUser] = useState({
        correo: '',
        empresa: ''
    })

    const [isLoading, setIsLoading] = useState(null);

    const router = useRouter();

    useEffect(() => {
        async function verifyusers() {
            try {
                const responseuser = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`, {
                    withCredentials: true
                })
                setUser(responseuser)

                if (responseuser.data.correo === "Arturo@laliebre.com") {
                    setIsLoading("true");
                }


            } catch (error) {
                console.error("no se que mierda paso", error);
            }
        };
        verifyusers()
    }, [])

    console.log(isLoading);

    const logoutProfile = () => {
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
                <Link className={style.linkoption} href="/review">Inventario</Link>
                <Link className={style.linkoption} href="/delivery">Delivery</Link>
                {isLoading === "true" && (
                    <div>
                        <Link className={style.linkoption} href="/validation">Validación de Inventario</Link>
                    </div>
                )}
                {isLoading === "true" && (
                    <div>
                        <Link className={style.linkoption} href="/managedelivery">Gestión de envios</Link>
                    </div>
                )}
                {isLoading === "true" && (
                    <div>
                        <Link className={style.linkoption} href="/dashboard">Dashboard</Link>
                    </div>
                )}
                <div className={style.loginoption}>
                    {!user && <Link className={style.linkoption} href="/login">Login</Link>}
                    {user && <Link className={style.linkoption} href="/login" onClick={() => logoutProfile()}>LogOut</Link>}
                    {/* <Link className={style.linkoption} href="/login">Login</Link> */}
                </div>
            </div>
        </nav>
    )
}

