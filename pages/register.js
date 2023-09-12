import Navbar from '../component/navbar.js'
import Link from "next/link";
import styles from '../styles/register.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';

export default function register() {


    const [file, setFile] = useState([])
    const [options, setOptions] = useState([])
    const [isLoading, setIsLoading] = useState(null);

    const [data, setData] = useState({
        categoria: "Belleza y Cuidado Personal",
        descripcion: "",
        unidadmedida: "conjunto",
        talla: "-",
        marca: "",
        modelo: "",
        cantidad: "1",
        Precio: "1"
    })

    const [user, setUser] = useState({
        correo: '',
        empresa: ''
    })


    useEffect(() => {
        async function updateoptions() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/options`)
                const { data } = response.data;
                setOptions(data);

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

            } catch (error) {
                console.error("no se que mierda paso", error);
            }
        };
        updateoptions()
    }, [])


    const handleoptions = (e) => {
        setIsLoading(e.target.value === "true");
    }

    const handlefile = (e) => {
        setFile(e.target.value)
        console.log(e.target.value);
    }

    const sendfile = async () => {

        const excelfile = document.getElementById('fileuploaded').files[0]
        const newfile = new FormData()
        newfile.append('file', excelfile)
        console.log(newfile.get('file'));
        try {
            console.log("ejecutando");
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/files`, newfile)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const handlechange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const savedata = async () => {
        console.log("guardando registro individual");
        try {
            const isDataComplete = Object.values(data).every(value => value !== "");
            if (isDataComplete === false) {
                alert("debes llenar todos los campos")
                return
            }
            
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data/singleregister`, {data, user})
            alert("Datos guardados")
        } catch (error) {
            console.error(error);
        }


    }



    return (
        <>
            <Navbar />

            <div className={styles.maincontainer}>
                <div className={styles.optioncontainer}>
                    <button className={styles.button} name="option1" value={true} onClick={handleoptions}>Registro individual</button>
                    <button className={styles.button} name="option2" value={false} onClick={handleoptions}>Registro masivo</button>
                </div>
                {isLoading === true && (
                    <div className={styles.optionregister}>
                        <h1>Registro individual</h1>
                        <div className={styles.singlecontainer}>
                            {/* Columna */}
                            <div className={styles.columncontainer}>
                                {/* cabecera */}
                                <div className={styles.headercontainer}>
                                    <p>Categoria</p>
                                </div>
                                {/* items */}
                                <div className={styles.rowcontainer}>
                                    <select onChange={handlechange} name='categoria'>
                                        {
                                            options.map(option => (
                                                option.categoria && <option key={option.id} value={option.categoria}>{option.categoria}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className={styles.columncontainer}>
                                {/* cabecera */}
                                <div className={styles.headercontainer}>
                                    <p>Descripción</p>
                                </div>
                                {/* items */}
                                <div className={styles.rowcontainer}>
                                    <input onChange={handlechange} name='descripcion'></input>
                                </div>
                            </div>
                            <div className={styles.columncontainer}>
                                {/* cabecera */}
                                <div className={styles.headercontainer}>
                                    <p>Unidad medida</p>
                                </div>
                                {/* items */}
                                <div className={styles.rowcontainer}>
                                    <select onChange={handlechange} name='unidadmedida'>
                                        {
                                            options.map(option => (
                                                option.unidadmedida && <option key={option.id} value={option.unidadmedida}>{option.unidadmedida}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className={styles.columncontainer}>
                                {/* cabecera */}
                                <div className={styles.headercontainer}>
                                    <p>Talla</p>
                                </div>
                                {/* items */}
                                <div className={styles.rowcontainer}>
                                    <select onChange={handlechange} name='talla'>
                                        {
                                            options.map(option => (
                                                option.talla && <option key={option.id} value={option.talla}>{option.talla}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className={styles.columncontainer}>
                                {/* cabecera */}
                                <div className={styles.headercontainer}>
                                    <p>Marca</p>
                                </div>
                                {/* items */}
                                <div className={styles.rowcontainer}>
                                    <input onChange={handlechange} name='marca' placeholder='escriba la marca'></input>
                                </div>
                            </div>
                            <div className={styles.columncontainer}>
                                {/* cabecera */}
                                <div className={styles.headercontainer}>
                                    <p>Modelo</p>
                                </div>
                                {/* items */}
                                <div className={styles.rowcontainer}>
                                    <input onChange={handlechange} name='modelo' placeholder='escriba el modelo'></input>
                                </div>
                            </div>
                            <div className={styles.columncontainer}>
                                {/* cabecera */}
                                <div className={styles.headercontainer}>
                                    <p>Cantidad</p>
                                </div>
                                {/* items */}
                                <div className={styles.rowcontainer}>
                                    <input onChange={handlechange} name='cantidad' type='number' defaultValue={1}></input>
                                </div>
                            </div>
                            <div className={styles.columncontainer}>
                                {/* cabecera */}
                                <div className={styles.headercontainer}>
                                    <p>Precio</p>
                                </div>
                                {/* items */}
                                <div className={styles.rowcontainer}>
                                    <input onChange={handlechange} name='cantidad' type='number' defaultValue={1}></input>
                                </div>
                            </div>
                        </div>
                        <button className={styles.singlecontainerbutton} onClick={savedata}>Guardar</button>
                    </div>
                )}
                {isLoading === false && (
                    <div className={styles.optionregister}>
                        <h1>Registro masivo</h1>
                        <div className={styles.massivecontainer}>
                            <div className={styles.dropcontainer}>
                                <p className={styles.droptitle}>Cargar formato de cronograma</p>
                                <input className={styles.inputfile} type='file' name='file' id='fileuploaded' value={file} onChange={handlefile}></input>
                                <br />
                                <button className={styles.buttonupload} onClick={sendfile}>Enviar archivo</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
};
