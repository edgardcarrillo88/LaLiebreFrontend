import Navbar from '../component/navbar'
import Image from 'next/image'
import Link from "next/link";
import logo from '../public/logo.webp'
import Cookies from 'js-cookie'

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";

export default function Login() {

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(credentials);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, { params: credentials });

    console.log(response.data);
    Cookies.set('MyTokenName', response.data.token, {
      expires: 30, // Expires in 30 days
      path: '/',    // Set the path to '/'
    });

    router.push("/register");

    // if (response.data.data === process.env.NEXT_PUBLIC_LOGIN_VERIFY) {
    //   const verifysesion = await axios.post(`/api/auth/login`, credentials);
    //   if (verifysesion.status === 200) {
    //     router.push("/register");
    //   }
    // }
  };

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.formcontainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Image
              className={styles.logo}
              src={logo}
              alt="Logo"
              width={100}
              height={100}
              priority
            />
            <input
              className={styles.input}
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              className={styles.input}
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <button className={styles.button} type="submit">
              Login
            </button>
            <p>¿Aún no eres usuario? </p>
            <Link href="/signup">Registrate</Link>
          </form>
        </div>
      </div>

    </>
  );
}
