import styles from '../styles/delivery.module.css'
import Navbar from '../component/navbar'
import axios from 'axios'
import { useState, useEffect } from 'react'


export default function delivery() {

    const [selectedItem, setSelectedItem] = useState({
        Item: "",
        Size: "",
        Cantidad: 0
    })
    const [addedItems, setAddedItems] = useState([])

    const [products, setProducts] = useState([])

    const [cantidad, setCantidad] = useState('')

    const handleSelectChange = (e) => {
        setSelectedItem({
            ...selectedItem,
            Item: e.target.value
        });
    }

    const handleSizeChange = (e) => {
        setSelectedItem({
            ...selectedItem,
            Size: e.target.value
        });
    };

    const handleCantidad = (e) => {
        setSelectedItem({
            ...selectedItem,
            Cantidad: e.target.value
        });
    }

    const filteredSizes = products
        .filter(product => product.descripcion === selectedItem.Item)
        .map(product => ({
            _id: product._id,
            talla: product.talla
        }));

    const filteredCant = products
        .filter(product => product.descripcion === selectedItem.Item && product.talla === selectedItem.Size)
        .map(product => product.Cantidad);


    useEffect(() => {
        async function getdata() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/getalldata`)
                setProducts(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("no se que mierda paso", error);
            }
        };
        getdata()
    }, [])


    const handleAddItem = () => {

        if (selectedItem.Item === "Seleccione un producto" || selectedItem.Item === "") {
            alert("Debe seleccionar un producto")
            return
        }

        if (selectedItem.Size === "Seleccione una talla" || selectedItem.Size === "") {
            alert("Debe seleccionar una talla")
            return
        }

        if (selectedItem.Cantidad === 0 || selectedItem.Cantidad === '') {
            alert("Debe ingresar la cantidad")
            return
        }

        if (selectedItem) {
            setAddedItems([...addedItems, selectedItem])
            setSelectedItem({
                Item: "",
                Size: "",
                Cantidad: 0
            })
        }



    }




    return (
        <>
            <Navbar />
            <div className={styles.deliverycontainer}>
                <div className={styles.origincontainer}>
                    <h1>ORIGEN</h1>
                    <div className={styles.dataorigincontainer}>
                        <div className={styles.cellscontainer}>
                            <div className={styles.labelboxcontainer}>
                                <p>Dirección de recojo</p>
                                <input placeholder="Dirección de recojo"></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>N° Casa, Dpto. Lote</p>
                                <input placeholder="N° Casa, Dpto. Lote"></input>
                            </div>
                        </div>
                        <div className={styles.cellscontainer}>
                            <div className={styles.labelboxcontainer}>
                                <p>Nombre</p>
                                <input placeholder="Nombre de quien envía"></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>Celular</p>
                                <input placeholder="Celular"></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>Distrito</p>
                                <input placeholder="Seleccione Distrito"></input>
                            </div>
                        </div>
                        <div className={styles.cellscontainer}>
                            <div className={styles.labelboxcontainer}>
                                <p>Referencia</p>
                                <textarea placeholder="Referencia, indicaciones, etc." />
                            </div>
                        </div>
                        <div className={styles.cellscontainer}>
                            <div className={styles.labelboxcontainer}>
                                <p>Fecha recojo</p>
                                <input type='date'></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>Rango horario</p>
                                <input placeholder="N° Casa, Dpto. Lote"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.origincontainer}>
                    <h1>DESTINO</h1>
                    <div className={styles.dataorigincontainer}>
                        <div className={styles.cellscontainer}>
                            <div className={styles.labelboxcontainer}>
                                <p>Dirección de recojo</p>
                                <input placeholder="Dirección de recojo"></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>N° Casa, Dpto. Lote</p>
                                <input placeholder="N° Casa, Dpto. Lote"></input>
                            </div>
                        </div>
                        <div className={styles.cellscontainer}>
                            <div className={styles.labelboxcontainer}>
                                <p>Nombre</p>
                                <input placeholder="Nombre de quien envía"></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>Celular</p>
                                <input placeholder="Celular"></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>Distrito</p>
                                <input placeholder="Seleccione Distrito"></input>
                            </div>
                        </div>
                        <div className={styles.cellscontainer}>
                            <div className={styles.labelboxcontainer}>
                                <p>Referencia</p>
                                <textarea placeholder="Referencia, indicaciones, etc." />
                            </div>
                        </div>
                        <div className={styles.cellscontainer}>
                            <div className={styles.labelboxcontainer}>
                                <p>Fecha entrega</p>
                                <input type='date'></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>Rango horario</p>
                                <input placeholder="N° Casa, Dpto. Lote"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.origincontainer}>
                    <h1>PRODUCTOS</h1>
                    <div className={styles.productscontainer}>
                        <div>
                            <p>Descripción</p>
                            <select value={selectedItem.Item} onChange={handleSelectChange}>
                                <option value="">Seleccione un producto</option>
                                {
                                    products.map(product => (
                                        product.descripcion && <option key={product._id} value={product.descripcion}>{product.descripcion}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <p>Talla</p>
                            <select onChange={handleSizeChange}>
                                <option value="">Seleccione una talla</option>
                                {
                                    filteredSizes.map(size => (
                                        <option key={size._id} value={size.talla}>{size.talla}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <p>Cantidad</p>
                            <input name='cantidad' type='number' defaultValue={0} value={selectedItem.Cantidad} onChange={handleCantidad}></input>
                        </div>

                        <div>
                            <p>Max. Items</p>
                            {/* <p>{Math.max(...filteredCant.cantidad)}</p> */}
                        </div>

                        <button onClick={handleAddItem}>agregar al carrito</button>
                    </div>
                    <h2>Lista de productos</h2>
                    <ul>
                        {addedItems.map(item => (
                            <li>{item.Item}, Talla {item.Size}, Cantidad {item.Cantidad}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
};
