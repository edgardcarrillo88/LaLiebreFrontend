import Navbar from '../../component/navbar'
import axios from 'axios';
import Image from 'next/image';
import productimage from '../../public/sdkkfh34f3n4sd3s4.png'
import styles from '../../styles/productdetail.module.css'


export default function productdetail({ productId }) {
    console.log(productId);

    return (
        <>
            <Navbar />
            <div className={styles.maincontainer}>
                <div className={styles.image}>
                    <Image
                        src={productimage}
                        alt="Logo"
                        priority
                        className={styles.productImage} 
                    />
                </div>
                <div className={styles.details}>
                    <h1>Detalle de productos</h1>
                    <p className={styles.label}>Categoria</p>
                    <p className={styles.productdetail}>{productId.categoria}</p>
                    <p className={styles.label}>Stock</p>
                    <p className={styles.productdetail}>{productId.cantidad}</p>
                    <p className={styles.label}>descripcion</p>
                    <p className={styles.productdetail}>{productId.descripcion}</p>
                    <button className={styles.buttonschedule}>Gestionar reparto</button>
                </div>
            </div>
        </>
    )
};





export async function getServerSideProps({ params }) {
    const { id } = params;

    console.log(params);
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/productid`, { params: { id: id } })
    const data = response.data;

    return {
        props: {
            productId: data,
        },
    };
}
