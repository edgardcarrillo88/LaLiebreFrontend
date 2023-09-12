import Navbar from '../component/navbar'
import styles from '../styles/review.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

export default function review() {

    const [products, setProducts] = useState([])

    const [user, setUser] = useState({
        correo: '',
        empresa: ''
    })



    useEffect(() => {
        async function getdata() {
            try {

                const token = Cookies.get('MyTokenName');
                console.log("mostrando token");
                console.log(token);


                const responseuser = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`, {
                    withCredentials: true
                })


                console.log(responseuser);
                setUser(responseuser.data)

                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/getalldata`,{
                    params: {
                        userData: responseuser.data
                    }
                })
                setProducts(response.data.data);

                
            } catch (error) {
                console.error("no se que mierda paso", error);
            }
        };
        getdata()
    }, [])

    const router = useRouter();

    const DynamicRoutes = (id) =>{
        console.log(id);
        router.push(`/products/${id}`);
    }

    return (
        <>
            <div className={styles.maincontainer}>
                <Navbar />
                <h1 className={styles.pageTitle}>Lista de stock de productos</h1>
                <div className={styles.tablecontainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Empresa</th>
                                <th>Descripción</th>
                                <th>UM</th>
                                <th>talla</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Cantidad</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(item => (
                                    <tr key={item.id} onClick={() => DynamicRoutes(item._id)}>
                                        <td>{item.id}</td>
                                        <td>{item.categoria}</td>
                                        <td>{item.descripcion}</td>
                                        <td>{item.unidadmedida}</td>
                                        <td>{item.talla}</td>
                                        <td>{item.marca}</td>
                                        <td>{item.modelo}</td>
                                        <td>{item.cantidad}</td>
                                        <td className={styles.statusbarcontainer}>
                                            <p className={styles.statusbar}>En envío</p>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
};
