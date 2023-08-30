import Navbar from '../component/navbar'
import Calendar from 'react-calendar'
import styles from '../styles/managedelivery.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function managedelivery() {

    const [date, setDate] = useState(new Date());
    const [products, setProducts] = useState([])
    const [checkedItems, setCheckedItems] = useState({});
    const [Motorizado, setMotorizado] = useState();
    const [productsSelected, setproductsSelected] = useState([])


    const [ListMotorizado, setListMotorizado] = useState(
        [{
            Motorizado: "Motorizado 1"
        },
        {
            Motorizado: "Motorizado 2"
        },
        {
            Motorizado: "Motorizado 3"
        }]
    );


    useEffect(() => {
        async function getdata() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/getdeliverydata`)
                setProducts(response.data.data);
            } catch (error) {
                console.error("no se que mierda paso", error);
            }
        };
        getdata()
    }, [])

    const handleMotorizado = (e) => {
        setMotorizado(e.target.value)
    }

    const handleAssign = (itemId) => {
        setCheckedItems(prevState => ({ ...prevState, [itemId]: !prevState[itemId] }));
        const index = products.findIndex(product => product._id === itemId)
        console.log(index);

        if (!checkedItems[itemId]) {
            console.log('Checkbox seleccionado');
            console.log(Motorizado);
            console.log(products[index]);
            products[index].Motorizado = Motorizado
            // const DataFilter = productsSelected.push(products[index])
            const newDataFilter = [...productsSelected, products[index]];
            setproductsSelected(newDataFilter)
            console.log(productsSelected);
        } else {
            console.log('Checkbox deseleccionado');
            console.log(products[index]);
            products[index].Motorizado = "TBD"
        }
    }



    return (
        <>
            <Navbar />
            <div className={styles.maincontainer}>
                <div>
                    <div>
                        <h1>Calendario</h1>
                        <div className={styles['react-calendar']}>
                            <Calendar onChange={setDate} value={date} />
                        </div>
                        <p>
                            <span>Selected Date:</span>{' '}
                            {date.toDateString()}
                        </p>
                    </div>
                    <div>
                        <select onChange={handleMotorizado}>
                            <option>Seleccione motorizado</option>
                            <option>Motorizado 1</option>
                            <option>Motorizado 2</option>
                            <option>Motorizado 3</option>
                        </select>
                    </div>
                    <div>
                        <h1>lista de motorizado con pedidos</h1>
                        {
                            ListMotorizado.map(item => (
                                <div>
                                    <p>{item.Motorizado}</p>
                                    <div>
                                        {
                                            productsSelected.map(item => (
                                                <li>{item.descripcion}</li>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <button>Guardar</button>
                    </div>
                </div>
                <div className={styles.listdeliverycontainer}>
                    <h1>Lista de envios</h1>
                    <div>
                        {
                            products.map(item => (
                                <div className={styles.listcontainer}>
                                    <div>
                                        <input key={item._id} type='checkbox' checked={checkedItems[item._id] || false} onChange={() => handleAssign(item._id)}></input>
                                    </div>
                                    <div>
                                        <p>Descripción</p>
                                        <input defaultValue={item.descripcion} disabled={true}></input>
                                    </div>
                                    <div>
                                        <p>Talla</p>
                                        <input defaultValue={item.talla} disabled={true}></input>
                                    </div>
                                    <div>
                                        <p>Cantidad</p>
                                        <input defaultValue={item.cantidad} disabled={true}></input>
                                    </div>
                                    <div>
                                        <p>Origen</p>
                                        <input defaultValue={item.DistritoOrigen} disabled={true}></input>
                                    </div>
                                    <div>
                                        <p>Destino</p>
                                        <input defaultValue={item.DistritoDestino} disabled={true}></input>
                                    </div>
                                    <div>
                                        <p>Fecha envío</p>
                                        <input type='date' min={new Date().toISOString().split('T')[0]} defaultValue={item.FechaDestino}></input>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </>
    )
};



