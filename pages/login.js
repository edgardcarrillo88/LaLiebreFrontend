import Navbar from "../component/navbar";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.webp";
import Cookies from "js-cookie";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { signin } = useAuth();

  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    try {
      const result = await signin(credentials.email, credentials.password);
      if (result) router.push("/register");
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.formcontainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <p>{error.message}</p>}

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
