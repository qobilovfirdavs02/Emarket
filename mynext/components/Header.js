import Link from "next/link";
import styles from "../styles/Home.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Eshop</h1>
      <nav>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/user/login">Login</Link>
          </li>
          <li>
            <Link href="/user/register">Register</Link>
            </li>
            <Link href="/products">Products</Link>
            <li>
            <Link href="/user/cart">Cart</Link>
          </li>
          <li>
            <Link href="/user/dashboard">ME</Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
