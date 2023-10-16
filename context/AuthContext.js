"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = function () {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = function ({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  async function signin(email, password) {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
      {
        params: {
          email,
          password,
        },
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      setUser(response.data.user);
      setIsAuth(true);

      Cookies.set("MyTokenName", response.data.token, {
        expires: 30, // Expires in 30 days
        path: "/", // Set the path to '/'
      });

      return true;
    }

    return false;
  }

  useEffect(() => {
    const token = Cookies.get("MyTokenName");
    console.log(token);

    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`, {
        params: {
          cookietoken: token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setIsAuth(true);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
        setIsAuth(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, signin, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
