import styles from '../styles/delivery.module.css'
import Navbar from '../component/navbar'

export default function delivery() {
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
                </div>
            </div>
        </>
    )
};
