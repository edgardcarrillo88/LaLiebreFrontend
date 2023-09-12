import styles from '../styles/delivery.module.css'
import Navbar from '../component/navbar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';


export default function delivery() {

    const [origen, setOrigen] = useState({
        Direccion: "",
        NoCasa: "",
        Nombre: "",
        Celular:"",
        Distrito:"",
        Referencia:"",
        Fecha:"",
        Hora:""
    })

    const [destino, setDestino] = useState({
        Direccion: "",
        NoCasa: "",
        Nombre: "",
        Celular:"",
        Distrito:"",
        Referencia:"",
        Fecha:"",
        Hora:""
    })

    const [selectedItem, setSelectedItem] = useState({
        Item: "",
        Size: "",
        Cantidad: 0
    })

    const [addedItems, setAddedItems] = useState([])

    const [products, setProducts] = useState([])

    const [CantidadMaxima, setCantidadMaxima] = useState('')

    const [CantidadLista, setCantidadLista] = useState('')

    const [user, setUser] = useState({
        correo: '',
        empresa: ''
    })


    const handleorigin = (e) => {
        setOrigen({
            ...origen,
            [e.target.name]: e.target.value,
          });
    }

    const handledestiny = (e) => {
        setDestino({
            ...destino,
            [e.target.name]: e.target.value,
          });
    }

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

        const filteredCant = products.filter(product => product.descripcion === selectedItem.Item && product.talla === e.target.value)[0]
        if (!filteredCant) {
            setCantidadMaxima(0);
        } else {

            const filteredCantlist = addedItems.filter(product => product.Item === selectedItem.Item && product.Size === e.target.value)

            if (!filteredCantlist.length === 0) {
                setCantidadLista(0);
                setCantidadMaxima(filteredCant.cantidad)
            } else {
                const totalcantidad = filteredCantlist.reduce((total, product) => total + parseFloat(product.Cantidad), 0)
                setCantidadLista(totalcantidad);
                setCantidadMaxima(filteredCant.cantidad - (isNaN(parseFloat(totalcantidad)) ? 0 : parseFloat(totalcantidad)));
            }
        }
    };

    const handleCantidad = (e) => {
        if (parseFloat(e.target.value) > CantidadMaxima) {
            setSelectedItem({
                ...selectedItem,
                Cantidad: CantidadMaxima
            });
        } else {
            setSelectedItem({
                ...selectedItem,
                Cantidad: e.target.value
            });
        }

    }

    const filteredSizes = products
        .filter(product => product.descripcion === selectedItem.Item)
        .map(product => ({
            _id: product._id,
            talla: product.talla
        }));

    useEffect(() => {
        async function getdata() {
            try {

                const token = Cookies.get('MyTokenName');
                console.log("mostrando token");
                console.log(token);


                // const responseuser = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`, {
                //     withCredentials: true
                // })

                const responseuser = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`, {
                    params: {
                        cookietoken: token
                    }
                })
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
            setCantidadMaxima(0)
        }
    }

    const submitdelivery = async () =>{
        const isDataOrigin = Object.values(origen).every(value => value !== "");
        const isDataDestiny = Object.values(destino).every(value => value !== "");
        const isDataProducts = Object.values(destino).every(value => value !== "");
            if (isDataOrigin === false || isDataDestiny===false || isDataProducts===false) {
                alert("debes llenar todos los campos")
                return
            }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/registerdelivery`,{addedItems, origen, destino, user})
        alert("Datos guardados")
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
                                <input name='Direccion' placeholder="Dirección de recojo" onChange={handleorigin}></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>N° Casa, Dpto. Lote</p>
                                <input name='NoCasa' placeholder="N° Casa, Dpto. Lote" onChange={handleorigin}></input>
                            </div>
                        </div>
                        <div className={styles.cellscontainer}>
                            <div className={styles.labelboxcontainer}>
                                <p>Nombre</p>
                                <input name='Nombre' placeholder="Nombre de quien envía" onChange={handleorigin}></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>Celular</p>
                                <input name='Celular' placeholder="Celular" onChange={handleorigin}></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>Distrito</p>
                                <input name='Distrito' placeholder="Seleccione Distrito" onChange={handleorigin}></input>
                            </div>
                        </div>
                        <div className={styles.cellscontainer}>
                            <div className={styles.labelboxcontainer}>
                                <p>Referencia</p>
                                <textarea name='Referencia' placeholder="Referencia, indicaciones, etc." onChange={handleorigin}/>
                            </div>
                        </div>
                        <div className={styles.cellscontainer}>
                            <div className={styles.labelboxcontainer}>
                                <p>Fecha recojo</p>
                                <input name='Fecha' type='date' min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} onChange={handleorigin}></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>Rango horario</p>
                                <input name='Hora' placeholder="Selecciona rango horario" onChange={handleorigin}></input>
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
                                <input name='Direccion' placeholder="Dirección de recojo" onChange={handledestiny}></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>N° Casa, Dpto. Lote</p>
                                <input name='NoCasa' placeholder="N° Casa, Dpto. Lote" onChange={handledestiny}></input>
                            </div>
                        </div>
                        <div className={styles.cellscontainer}>
                            <div className={styles.labelboxcontainer}>
                                <p>Nombre</p>
                                <input name='Nombre' placeholder="Nombre de quien envía" onChange={handledestiny}></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>Celular</p>
                                <input name='Celular' placeholder="Celular" onChange={handledestiny}></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>Distrito</p>
                                <input name='Distrito' placeholder="Seleccione Distrito" onChange={handledestiny}></input>
                            </div>
                        </div>
                        <div className={styles.cellscontainer}>
                            <div className={styles.labelboxcontainer}>
                                <p>Referencia</p>
                                <textarea name='Referencia' placeholder="Referencia, indicaciones, etc." onChange={handledestiny}/>
                            </div>
                        </div>
                        <div className={styles.cellscontainer}>
                            <div className={styles.labelboxcontainer}>
                                <p>Fecha entrega</p>
                                <input name='Fecha' type='date' min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} onChange={handledestiny}></input>
                            </div>

                            <div className={styles.labelboxcontainer}>
                                <p>Rango horario</p>
                                <input name='Hora' placeholder="Selecciona rango horario" onChange={handledestiny}></input>
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
                            <input name='cantidad' type='number' defaultValue={0} value={selectedItem.Cantidad} max={CantidadMaxima} onChange={handleCantidad}></input>
                        </div>

                        <div>
                            <p>Max. Items</p>
                            <input disabled="true" defaultValue={CantidadMaxima}></input>
                        </div>

                        <button onClick={handleAddItem}>agregar al carrito</button>
                    </div>
                    <h2>Lista de productos</h2>
                    <ul>
                        {addedItems.map(item => (
                            <li>{item.Item}, Talla {item.Size}, Cantidad {item.Cantidad}</li>
                        ))}
                    </ul>
                    <div className={styles.buttonposition}>
                        <button className={styles.buttonsave} onClick={submitdelivery}>Guardar envío</button>
                    </div>
                </div>
            </div>
        </>
    )
};
