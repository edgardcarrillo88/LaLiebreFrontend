import Link from "next/link";
import style from "../styles/navbar.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";


export default function Menu() {

  const { isAuth } = useAuth();
  const router = useRouter();
  const { user: userData } = useAuth();

  //   useEffect(() => {
  //     console.log("El useEffect se está ejecutando...");
  //     async function verifyusers() {
  //       console.log("El verifyuser");

  //       try {
  //         const token = Cookies.get("MyTokenName");
  //         console.log("mostrando token");
  //         console.log(token);

  //         // const responseuser = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`, {
  //         //     withCredentials: true
  //         // })

  //         const responseuser = await axios.get(
  //           `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`,
  //           {
  //             params: {
  //               cookietoken: token,
  //             },
  //           }
  //         );
  //         console.log("navbar");
  //         console.log(responseuser.data);
  //         setUser(responseuser.data);

  //         if (responseuser.data.correo === "Arturo@laliebre.com") {
  //           console.log("Condición verdadera");
  //           setIsLoading(true);
  //         } else {
  //           console.log("Condición falsa");
  //         }
  //       } catch (error) {
  //         console.log("no hay usuario");
  //       }
  //     }
  //     verifyusers();
  //   }, []);


  const logoutProfile = () => {
    Cookies.set("MyTokenName", null, {
      expires: 0, // Expires in 30 days
      path: "/", // Set the path to '/'
    });

    router.push("/");
  };

  return (
    <nav className={style.navbar}>
      <div className={style.mobilemenu}>&#9776;</div>
      <div className={style.navbaroption}>
        <Link className={style.linkoption} href="/register">
          Registrar productos
        </Link>
        <Link className={style.linkoption} href="/review">
          Inventario
        </Link>
        <Link className={style.linkoption} href="/delivery">
          Delivery
        </Link>
        {userData?.rol==="admin" && (
          <Link className={style.linkoption} href="/validation">
            Validación de Inventario
          </Link>
        )}
        {userData?.rol==="admin" && (
          <Link className={style.linkoption} href="/managedelivery">
            Gestión de envios
          </Link>
        )}
        {userData?.rol==="admin" && (
          <Link className={style.linkoption} href="/dashboard">
            Dashboard
          </Link>
        )}
        <div className={style.loginoption}>
          {!isAuth && (
            <Link className={style.linkoption} href="/login">
              Login
            </Link>
          )}
          {isAuth && (
            <Link
              className={style.linkoption}
              href="/login"
              onClick={() => logoutProfile()}
            >
              LogOut
            </Link>
          )}
          {/* <Link className={style.linkoption} href="/login">Login</Link> */}
        </div>
      </div>
    </nav>
  );
}
