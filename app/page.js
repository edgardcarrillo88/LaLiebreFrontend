import styles from '../styles/main.module.css'
import Link from "next/link";

export default function Home() {

  const logo = '/logoliebre.png'

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.name}>
            <h1>La Liebre Courier</h1>
          </div>
          <div className={styles.options}>
            <h1>Nosotros</h1>
            <h1>Contactanos</h1>
            <h1>Option 3</h1>
            <h1>Option 4</h1>
            {/* <button>Login</button> */}
            <Link className={styles.buttonlogin} href="/login">Login</Link>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.comment}>
            <h1>Conecatando rutas, Cumpliendo entregas</h1>
          </div>
          <div className={styles.logo}>
            <img src={logo} alt='' />
          </div>
        </div>
      </div>
    </>
  )
}
