import Navbar from '../component/navbar'
import styles from '../styles/validation.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function validation() {

    const [products, setProducts] = useState([])
    const [productsfilter, setProductsfilter] = useState([])

    useEffect(() => {
        async function getdata() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/pending`)
                setProducts(response.data.data);
            } catch (error) {
                console.error("no se que mierda paso", error);
            }
        };
        getdata()
    }, [])

    const handlecant = (e,id) => {
        const productUpdate = products.find(product => product._id === id)
        productUpdate.cantidad=e.target.value
    }

    const handlevalidation = async () => {
       await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/validation`,products)
    }

    return (
        <>
            <div className={styles.maincontainer}>
                <Navbar />
                <h1 className={styles.pageTitle}>Lista productos recien ingresados</h1>
                <div className={styles.tablecontainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Descripción</th>
                                <th>UM</th>
                                <th>talla</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(item => (
                                    <tr key={item.id}>
                                        <td>Cliente</td>
                                        <td>{item.descripcion}</td>
                                        <td>{item.unidadmedida}</td>
                                        <td>{item.talla}</td>
                                        <td>{item.marca}</td>
                                        <td>{item.modelo}</td>
                                        <td>
                                            <input type='number' defaultValue={item.cantidad} onChange={(e) => handlecant(e,item._id)}></input>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className={styles.buttonflex}>
                        <button className={styles.buttonsave} onClick={handlevalidation}>Guardar</button>
                    </div>
                </div>
            </div >
        </>
    )
};
