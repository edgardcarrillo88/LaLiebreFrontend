import { useState } from 'react';
import Navbar from '../component/navbar'
import styles from "../styles/login.module.css";
import logo from '../public/logo.webp'
import Image from 'next/image'
import axios from 'axios';
import { useRouter } from "next/router";


export default function register() {


    const [datauser, setDatauser] = useState({
        correo: "",
        usuario: "",
        contrasena: "",
        empresa: "",
        celular: "",
    })

    const handleChange = (e) => {
        setDatauser({
            ...datauser,
            [e.target.name]: e.target.value
        })
    }

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(datauser);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, datauser);
        //const response = await axios.post(`/api/auth/login`, credentials);
        console.log(response);
        if (response.status === 200) {
            router.push("/login");
        }
    };





    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <Image
                    className={styles.logo}
                    src={logo}
                    alt="Logo"
                    width={100}
                    height={100}
                    priority
                />
                <h1>Registrarse</h1>
                <form className={styles.form}
                //onSubmit={handleSubmit}
                >
                    <input
                        className={styles.input}
                        name="usuario"
                        type="Nombres"
                        placeholder="Nombres"
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        name="correo"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        name="empresa"
                        type="empresa"
                        placeholder="empresa"
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        name="celular"
                        type="Celular"
                        placeholder="Celular"
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        name="contrasena"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button className={styles.button} onClick={handleSubmit} type="submit">
                        Registrarse
                    </button>
                </form>
            </div>
        </>

    )

};
