import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products/") // ✅ Backenddan mahsulotlarni olish
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Xatolik:", error));
  }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>Eshop</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <h2>Welcome to Eshop</h2>
        <p>Eng yaxshi mahsulotlar bizda!</p>
      </main>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>Mahsulotlar topilmadi.</p>
        )}
      </div>
    </div>
    
  );
}


